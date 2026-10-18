import React, { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import DoctorForm from '../../components/DoctorForm';

export default function AdminDashboard() {
  // საწყისი მონაცემების სთეითი
  const [doctors, setDoctors] = useState([
    { id: 1, name: "დრ. ნინო ბერიძე", specialty: "კარდიოლოგი", email: "nino@medibook.ge" },
    { id: 2, name: "დრ. დავით ლომიძე", specialty: "ნევროლოგი", email: "davit@medibook.ge" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // ახალი მონაცემის დამატება დინამიკურად (გვერდის ფრეშის გარეშე)
  const handleAddDoctor = (data) => {
    const newDoctor = {
      id: Date.now(), // უნიკალური ID
      ...data,
    };
    setDoctors([newDoctor, ...doctors]); // ვამატებთ მასივის თავში
    setIsModalOpen(false); // ვხურავთ მოდალს
  };

  // მონაცემის წაშლა
  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter(doc => doc.id !== id));
  };

  return (
    <div className="min-h-screen p-8 text-white bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">ექიმების მართვის პანელი</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-semibold transition shadow-lg bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl shadow-sky-500/20 hover:from-sky-400 hover:to-blue-500"
          >
            + Add New Doctor
          </button>
        </div>

        {/* ცხრილი ან სიის რენდერი */}
        <div className="overflow-hidden border bg-slate-900 rounded-2xl border-blue-500/20">
          <table className="w-full text-sm text-left text-blue-200">
            <thead className="text-xs text-blue-400 uppercase border-b bg-slate-950/60 border-blue-500/20">
              <tr>
                <th className="px-6 py-3">სახელი</th>
                <th className="px-6 py-3">სპეციალობა</th>
                <th className="px-6 py-3">ელ-ფოსტა</th>
                <th className="px-6 py-3 text-right">მოქმედება</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-500/10">
              {doctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-800/30">
                  <td className="px-6 py-4 font-medium text-white">{doc.name}</td>
                  <td className="px-6 py-4 text-sky-400">{doc.specialty}</td>
                  <td className="px-6 py-4">{doc.email}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDeleteDoctor(doc.id)}
                      className="px-3 py-1 text-xs transition border rounded-lg bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20"
                    >
                      წაშლა
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* მოდალური ფანჯარა */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="ახალი ექიმის დამატება"
      >
        <DoctorForm onSubmitData={handleAddDoctor} onClose={() => setIsModalOpen(false)} />
      </Modal>

    </div>
  );
}