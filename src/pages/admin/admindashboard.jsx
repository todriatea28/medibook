import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import DoctorForm from "../../components/DoctorForm";
import { doctorService } from "../../services/doctorService";

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    try {
      setLoading(true);
      setDoctors(await doctorService.getDoctors());
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleAddDoctor = async (data) => {
    try {
      const newDoctor = await doctorService.addDoctor(data);
      setDoctors([newDoctor, ...doctors]);
      setIsModalOpen(false);
      setErrorMsg("");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (!window.confirm("ნამდვილად გსურთ ექიმის წაშლა?")) return;
    try {
      await doctorService.deleteDoctor(id);
      setDoctors(doctors.filter((doc) => doc.id !== id));
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="text-white">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">ექიმების მართვა</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-semibold transition shadow-lg bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl hover:from-sky-400 hover:to-blue-500"
          >
            + ექიმის დამატება
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 text-xs border text-rose-300 bg-rose-500/10 border-rose-500/30 rounded-xl">
            {errorMsg}
          </div>
        )}

        <div className="overflow-x-auto border bg-slate-900 rounded-2xl border-blue-500/20">
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
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-sky-400"
                  >
                    იტვირთება...
                  </td>
                </tr>
              ) : doctors.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center">
                    ექიმები ჯერ არ არის დამატებული.
                  </td>
                </tr>
              ) : (
                doctors.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-medium text-white">
                      {doc.name}
                    </td>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="ახალი ექიმის დამატება"
      >
        <DoctorForm
          onSubmitData={handleAddDoctor}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
