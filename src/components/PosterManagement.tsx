import { Plus, Edit, Trash2 } from 'lucide-react';
import type { PosterItem } from '../types';

interface PosterManagementProps {
  items: PosterItem[];
}

export default function PosterManagement({ items }: PosterManagementProps) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">活動海報管理</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-md">
          <Plus className="w-5 h-5" />
          新增海報
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">縮圖</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">說明</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">狀態</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <img src={item.thumbnail} alt="poster" className="w-12 h-12 rounded-lg object-cover border border-gray-200" referrerPolicy="no-referrer" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">{item.description}</td>
                <td className="px-6 py-4">
                  <select 
                    className="bg-gray-50 border border-gray-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={item.status}
                  >
                    <option value="upcoming">即將</option>
                    <option value="history">歷史</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
