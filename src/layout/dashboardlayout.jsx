// src/layout/dashboardLayout.jsx
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import ThemeToggle from "../components/themetoggle";
import { useUserStore } from "../store/userstore";
import API from "../services/api";

function DashboardLayout() {
  const user = useUserStore((s) => s.user);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.replace("/dashboard", "") || "/";
    if (path === "/" || path === "") return "Overview";
    const parts = path.split("/").filter(Boolean);
    return parts[parts.length - 1]
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
  };

  const pageTitle = getPageTitle();

  const avatarInitial = user?.username
    ? user.username.charAt(0).toUpperCase()
    : "U";

  // -------------------- FRONTEND-ONLY RECURRING RUNNER --------------------
  useEffect(() => {
    const runRecurring = async () => {
      try {
        if (!user || !user._id) return;
        const uid = user._id;
        const tplKey = `recurring_templates_${uid}`;
        const lastKey = `recurring_last_run_${uid}`;

        const tplJSON = localStorage.getItem(tplKey);
        if (!tplJSON) return;
        let templates = JSON.parse(tplJSON);
        if (!Array.isArray(templates) || templates.length === 0) return;

        // last run
        const lastRunISO = localStorage.getItem(lastKey);
        const lastRun = lastRunISO ? new Date(lastRunISO) : null;
        const now = new Date();

        // For each template create missing occurrences between lastRun (exclusive) and today (inclusive)
        for (const tpl of templates) {
          // tpl: { title, amount, category, type, freq, startDate }
          const freq = tpl.freq || "monthly";
          const start = tpl.startDate ? new Date(tpl.startDate) : new Date();
          // cursor: earliest date to consider
          let cursor = lastRun ? new Date(lastRun) : new Date(start);
          // advance by one day so we don't recreate lastRun date
          cursor.setDate(cursor.getDate() + 1);

          // ensure cursor not before start
          if (cursor < start) cursor = new Date(start);

          const toCreate = [];
          while (cursor <= now) {
            // create an occurrence for cursor
            const occurrenceDate = new Date(cursor);

            // push payload
            toCreate.push({
              title: tpl.title || "Recurring",
              amount: tpl.amount,
              category: tpl.category,
              type: tpl.type,
              date: occurrenceDate.toISOString(),
              recurringTemplateId: tpl.id ?? null,
            });

            // advance cursor
            if (freq === "daily") {
              cursor.setDate(cursor.getDate() + 1);
            } else if (freq === "weekly") {
              cursor.setDate(cursor.getDate() + 7);
            } else {
              // monthly
              const d = cursor.getDate();
              cursor.setMonth(cursor.getMonth() + 1);
              // handle month overflow
              if (cursor.getDate() !== d) {
                cursor.setDate(0); // last day of previous month
              }
            }
          }

          // create on backend
          for (const tx of toCreate) {
            try {
              // API.transactions.add exists in your project
              await API.transactions.add({
                title: tx.title,
                amount: tx.amount,
                category: tx.category,
                type: tx.type,
                date: tx.date,
                // marker so you can identify recurring-generated items if desired
                recurringGenerated: true,
              });
            } catch (err) {
              // ignore per-item failures, continue
              console.warn("Recurring create failed", err);
            }
          }
        }

        // update last run
        localStorage.setItem(lastKey, new Date().toISOString());
      } catch (err) {
        console.error("Recurring runner error", err);
      }
    };

    runRecurring();
  }, [user]);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />

      {/* MAIN */}
      <div
        className="flex-grow-1 d-flex flex-column"
        style={{ minHeight: 0 }}
      >
        {/* TOPBAR */}
        <header
          className="d-flex align-items-center justify-content-between px-3"
          style={{
            height: 72,
            backgroundColor: "var(--card)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <h3 className="m-0 fw-bold text-theme">{pageTitle}</h3>

          <div className="d-flex align-items-center gap-3">
            <ThemeToggle />

            {/* Avatar */}
            <div
              title={user?.username}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--text)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow)",
              }}
            >
              {avatarInitial}
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main
          style={{
            flex: 1,
            backgroundColor: "var(--bg)",
            overflowY: "auto",
            minHeight: 0,
          }}
        >
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
