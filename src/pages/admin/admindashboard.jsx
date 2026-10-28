import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import DoctorForm from "../../components/DoctorForm";
import { doctorService } from "../../services/doctorService";

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  async function loadDoctors() {
    setLoading(true);
    const { data, isFallback } = await doctorService.getDoctors();
    setDoctors(data);
    setIsFallback(isFallback);
    setLoading(false);
  }

  useEffect(() => {
    loadDoctors();
  }, []);

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
    <div className="text-slate-800">
      <div className="space-y-6">
        {isFallback && (
          <div
            role="status"
            className="p-3 text-sm font-semibold border text-amber-700 bg-amber-50 border-amber-200 rounded-xl"
          >
            ⚠️ ნაჩვენებია ლოკალური დემო მონაცემები
          </div>
        )}

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">ექიმების მართვა</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-semibold text-white transition bg-teal-600 shadow-md rounded-xl hover:bg-teal-500"
          >
            + ექიმის დამატება
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 text-xs border text-rose-600 bg-rose-50 border-rose-200 rounded-xl">
            {errorMsg}
          </div>
        )}

        <div className="overflow-x-auto bg-white border shadow-sm rounded-2xl border-slate-200">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs uppercase border-b text-slate-500 bg-slate-50 border-slate-200">
              <tr>
                <th className="px-6 py-3">სახელი</th>
                <th className="px-6 py-3">სპეციალობა</th>
                <th className="px-6 py-3">ელ-ფოსტა</th>
                <th className="px-6 py-3 text-right">მოქმედება</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-teal-600">
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
                  <tr key={doc.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{doc.name}</td>
                    <td className="px-6 py-4 text-teal-600">{doc.specialty}</td>
                    <td className="px-6 py-4">{doc.email}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteDoctor(doc.id)}
                        className="px-3 py-1 text-xs transition border rounded-lg bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100"
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