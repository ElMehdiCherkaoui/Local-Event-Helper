import AdminLayout from "../../layouts/AdminLayout";

type LogAction =
  | "Ban"
  | "Approve"
  | "Update"
  | "Warning"
  | "Create"
  | "Reject"
  | "Generate"
  | "Unban";

type AuditLogItem = {
  id: number;
  timestamp: string;
  adminName: string;
  adminEmail: string;
  adminInitial: string;
  adminColor: string;
  action: LogAction;
  target: string;
  details: string;
  highlighted?: boolean;
};

const auditLogs: AuditLogItem[] = [
  {
    id: 1,
    timestamp: "Feb 17, 14:32",
    adminName: "Admin User",
    adminEmail: "admin@leh.com",
    adminInitial: "A",
    adminColor: "bg-blue-500",
    action: "Ban",
    target: "SpamBot123",
    details: "User banned for spam",
  },
  {
    id: 2,
    timestamp: "Feb 17, 14:28",
    adminName: "Admin User",
    adminEmail: "admin@leh.com",
    adminInitial: "A",
    adminColor: "bg-blue-500",
    action: "Approve",
    target: "Event #EVT-2401",
    details: "Beach Wedding approved",
  },
  {
    id: 3,
    timestamp: "Feb 17, 14:15",
    adminName: "Manager User",
    adminEmail: "manager@leh.com",
    adminInitial: "M",
    adminColor: "bg-purple-500",
    action: "Update",
    target: "Commission Rate",
    details: "Changed 10% to 12%",
  },
  {
    id: 4,
    timestamp: "Feb 17, 13:48",
    adminName: "Support User",
    adminEmail: "support@leh.com",
    adminInitial: "S",
    adminColor: "bg-cyan-500",
    action: "Warning",
    target: "John Photography",
    details: "Sent warning for no-show",
  },
  {
    id: 5,
    timestamp: "Feb 17, 13:35",
    adminName: "Admin User",
    adminEmail: "admin@leh.com",
    adminInitial: "A",
    adminColor: "bg-blue-500",
    action: "Create",
    target: "User: Alice Smith",
    details: "New organizer created",
  },
  {
    id: 6,
    timestamp: "Feb 17, 13:22",
    adminName: "Manager User",
    adminEmail: "manager@leh.com",
    adminInitial: "M",
    adminColor: "bg-purple-500",
    action: "Reject",
    target: "Event #EVT-2398",
    details: "Event rejected - inappropriate content",
  },
  {
    id: 7,
    timestamp: "Feb 17, 13:10",
    adminName: "Report User",
    adminEmail: "reports@leh.com",
    adminInitial: "R",
    adminColor: "bg-green-500",
    action: "Generate",
    target: "Monthly Report",
    details: "February 2026 report",
  },
  {
    id: 8,
    timestamp: "Feb 17, 13:05",
    adminName: "Manager User",
    adminEmail: "manager@leh.com",
    adminInitial: "M",
    adminColor: "bg-purple-500",
    action: "Update",
    target: "Sarah Catering",
    details: "Updated business info",
  },
  {
    id: 9,
    timestamp: "Feb 17, 12:45",
    adminName: "Support User",
    adminEmail: "support@leh.com",
    adminInitial: "S",
    adminColor: "bg-cyan-500",
    action: "Unban",
    target: "FakeEvents2024",
    details: "User unbanned after appeal",
  },
];



function ActionBadge({ action }: { action: LogAction }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-medium bg-red-500`}
    >
      <span></span>
      <span>{action}</span>
    </span>
  );
}

export default function AuditLogs() {
  return (
    <AdminLayout
      title="Audit Logs"
      subtitle="Track all admin actions and changes"
    >
      <main className="space-y-4 p-4 md:p-6">
        <section className="overflow-hidden rounded-xl border border-white/10 bg-[#1E293B]">
          <div className="hidden grid-cols-5 border-b border-white/10 bg-[#0F172A] px-5 py-4 text-xs font-medium text-gray-400 md:grid">
            <p>Timestamp</p>
            <p>Admin</p>
            <p>Action</p>
            <p>Target</p>
            <p>Details</p>
          </div>

          <div className="hidden md:block">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className={`grid grid-cols-5 items-center border-b border-white/10 px-5 py-4 text-sm text-white last:border-b-0 ${
                "hover:bg-cyan-500/10" 
                }`}
              >
                <div className="text-gray-300">{log.timestamp}</div>

                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${log.adminColor}`}
                  >
                    {log.adminInitial}
                  </div>
                  <div>
                    <p className="font-medium text-white">{log.adminName}</p>
                    <p className="text-xs text-gray-400">{log.adminEmail}</p>
                  </div>
                </div>

                <div>
                  <ActionBadge action={log.action} />
                </div>

                <div className="font-medium text-gray-100">{log.target}</div>

                <div className="text-gray-400">{log.details}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3 p-3 md:hidden">
            {auditLogs.slice(0, 5).map((log) => (
              <article
                key={log.id}
                className="rounded-xl border border-white/10 bg-[#18253d] p-4 text-white"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white ${log.adminColor}`}
                    >
                      {log.adminInitial}
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{log.adminName}</p>
                      <p className="text-[10px] text-gray-400">
                        {log.adminEmail}
                      </p>
                    </div>
                  </div>

                  <ActionBadge action={log.action} />
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-400">Time:</span>
                    <span className="text-right text-white">{log.timestamp}</span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-gray-400">Target:</span>
                    <span className="text-right text-white">{log.target}</span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-gray-400">Detail:</span>
                    <span className="text-right text-gray-300">
                      {log.details}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-center gap-2 pt-1">
          <button className="rounded border border-white/10 bg-[#1E293B] px-3 py-1.5 text-xs text-gray-300">
            Prev
          </button>
          <button className="rounded bg-cyan-500 px-3 py-1.5 text-xs text-white">
            1
          </button>
          <button className="rounded border border-white/10 bg-[#1E293B] px-3 py-1.5 text-xs text-gray-300">
            2
          </button>
          <button className="rounded border border-white/10 bg-[#1E293B] px-3 py-1.5 text-xs text-gray-300">
            3
          </button>
          <button className="rounded border border-white/10 bg-[#1E293B] px-3 py-1.5 text-xs text-gray-300">
            Next
          </button>
        </div>
      </main>
    </AdminLayout>
  );
}