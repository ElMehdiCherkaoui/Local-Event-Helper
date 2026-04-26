import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';

type AuditLog = {
	id: number;
	description: string;
	event?: string | null;
	created_at?: string;
	causer?: {
		name?: string;
		email?: string;
	};
	subject?: {
		name?: string;
		title?: string;
	};
	properties?: {
		action?: string;
		user_email?: string;
	};
};


export default function AuditLogs() {
	const [logs, setLogs] = useState<AuditLog[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const loadLogs = async () => {
			const token = localStorage.getItem('token');

			if (!token) {
				setError('No token found. Please login again.');
				setLoading(false);
				return;
			}

			try {
				const response = await axios.get('http://127.0.0.1:8000/api/admin/logs', {
					headers: {
						Authorization: `Bearer ${token}`,
				
					},
				});

				setLogs(response.data?.logs );
			} catch (err: any) {
				setError('Failed to load audit logs.');
			} finally {
				setLoading(false);
			}
		};

		loadLogs();
	}, []);

	return (
		<AdminLayout title="Audit Logs" subtitle="Simple history of admin actions">
			<main className="space-y-4 p-4 md:p-6">
				{loading ? <p className="text-sm text-gray-300">Loading audit logs...</p> : null}
				{error ? <p className="text-sm text-red-400">{error}</p> : null}

				<section className="overflow-hidden rounded-xl border border-white/10 bg-[#1E293B]">
					<div className="hidden grid-cols-5 border-b border-white/10 bg-[#0F172A] px-5 py-4 text-xs font-medium text-gray-400 md:grid">
						<p>Time</p>
						<p>Admin</p>
						<p>Action</p>
						<p>Target</p>
						<p>Details</p>
					</div>

					<div className="hidden md:block">
						{logs.map((log) => (
							<div key={log.id} className="grid grid-cols-5 items-center border-b border-white/10 px-5 py-4 text-sm text-white last:border-b-0">
								<div className="text-gray-300">{new Date(log.created_at??'').toLocaleString()}</div>
								<div>
									<p className="font-medium text-white">{log.causer?.name || 'System'}</p>
									<p className="text-xs text-gray-400">{log.causer?.email || '-'}</p>
								</div>
								<div>
									<span className="rounded bg-cyan-500/20 px-2 py-1 text-[10px] font-medium text-cyan-300">
										{log.description}
									</span>
								</div>
								<div className="font-medium text-gray-100">{log.subject?.name || log.subject?.title || log.properties?.user_email || '-'}</div>
								<div className="text-gray-400">{log.properties?.action || log.event || '-'}</div>
							</div>
						))}
					</div>

					<div className="space-y-3 p-3 md:hidden">
						{logs.map((log) => (
							<article key={log.id} className="rounded-xl border border-white/10 bg-[#18253d] p-4 text-white">
								<div className="mb-2 flex items-start justify-between gap-3">
									<div>
										<p className="text-xs font-semibold">{log.causer?.name || 'System'}</p>
										<p className="text-[10px] text-gray-400">{log.causer?.email || '-'}</p>
									</div>
									<span className="rounded bg-cyan-500/20 px-2 py-1 text-[10px] font-medium text-cyan-300">
										{log.description}
									</span>
								</div>

								<div className="space-y-2 text-xs">
									<div className="flex justify-between gap-3">
										<span className="text-gray-400">Time:</span>
										<span className="text-right text-white">{new Date(log.created_at??'').toLocaleString()}</span>
									</div>
									<div className="flex justify-between gap-3">
										<span className="text-gray-400">Target:</span>
										<span className="text-right text-white">{log.subject?.name || log.subject?.title || log.properties?.user_email || '-'}</span>
									</div>
									<div className="flex justify-between gap-3">
										<span className="text-gray-400">Details:</span>
										<span className="text-right text-gray-300">{log.properties?.action || log.event || '-'}</span>
									</div>
								</div>
							</article>
						))}
					</div>
				</section>
			</main>
		</AdminLayout>
	);
}
