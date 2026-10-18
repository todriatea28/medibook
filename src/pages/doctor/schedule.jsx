import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';

export default function Schedule() {
  const [currentWeek] = useState("8 ივნისი - 14 ივნისი, 2026");

  // განრიგის სთეითი, რომ დინამიკურად განახლდეს ჯავშნისას
  const [scheduleData, setScheduleData] = useState([
    {
      day: "ორშაბათი, 8 ივნისი",
      slots: [
        { id: 101, time: "10:00", doctor: "დრ. ნინო ბერიძე", status: "თავისუფალი" },
        { id: 102, time: "12:30", doctor: "დრ. დავით ლომიძე", status: "დაკავებული" },
      ]
    },
    {
      day: "სამშაბათი, 9 ივნისი",
      slots: [
        { id: 201, time: "14:00", doctor: "დრ. ნინო ბერიძე", status: "თავისუფალი" },
      ]
    },
    {
      day: "ოთხშაბათი, 10 ივნისი",
      slots: [
        { id: 301, time: "11:00", doctor: "დრ. მაია ქავთარაძე", status: "თავისუფალი" },
      ]
    },
    {
      day: "ხუთშაბათი, 11 ივნისი",
      slots: [
        { id: 401, time: "09:30", doctor: "დრ. ნინო ბერიძე", status: "დაკავებული" },
      ]
    },
    {
      day: "პარასკევი, 12 ივნისი",
      slots: [
        { id: 501, time: "16:00", doctor: "დრ. დავით ლომიძე", status: "თავისუფალი" },
      ]
    }
  ]);

  // მოდალისა და არჩეული სლოტის სთეითები
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [formError, setFormError] = useState('');

  // დაჯავშნის ღილაკზე დაჭერა
  const handleOpenBooking = (slot) => {
    setSelectedSlot(slot);
    setPatientName('');
    setPatientPhone('');
    setFormError('');
    setIsModalOpen(true);
  };

  // ჯავშნის დადასტურება
  const handleConfirmBooking = (e) => {
    e.preventDefault();

    if (!patientName.trim() || !patientPhone.trim()) {
      setFormError('გთხოვთ შეავსოთ ყველა სავალდებულო ველი!');
      return;
    }

    // განრიგში სლოტის სტატუსის განახლება დინამიკურად
    setScheduleData(prev => 
      prev.map(dayItem => ({
        ...dayItem,
        slots: dayItem.slots.map(slot => 
          slot.id === selectedSlot.id 
            ? { ...slot, status: 'დაკავებული' } 
            : slot
        )
      }))
    );

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50 text-slate-800">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-20 bg-white border-b shadow-sm border-slate-200">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6">
          <Link to="/" className="text-2xl font-black tracking-tight text-teal-600">
            MediBook
          </Link>
          <nav className="flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link to="/" className="transition hover:text-teal-600">მთავარი</Link>
            <Link to="/schedule" className="text-teal-600">განრიგი</Link>
            <Link to="/login" className="px-4 py-2 text-teal-700 transition border border-teal-200 bg-teal-50 rounded-xl hover:bg-teal-100">
              შესვლა
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-8 mx-auto space-y-8 max-w-7xl sm:px-6">
        
        {/* Banner Section */}
        <div className="max-w-3xl p-8 mx-auto space-y-3 text-center bg-white border shadow-sm rounded-3xl border-slate-200">
          <h1 className="text-2xl font-extrabold sm:text-3xl text-slate-900">
            ვიზიტების განრიგი და თავისუფალი სლოტები
          </h1>
          <p className="text-sm text-slate-500">
            აირჩიეთ სასურველი თარიღი და დრო ექიმთან კონსულტაციის დასაჯავშნად.
          </p>
        </div>

        {/* Week Selector Bar */}
        <div className="flex flex-col items-center justify-between gap-4 p-4 bg-white border shadow-sm rounded-2xl border-slate-200 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
            <h2 className="text-lg font-bold text-slate-800">
              მიმდინარე კვირა: <span className="text-teal-600">{currentWeek}</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-xs font-semibold transition border bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border-slate-300">
              ← წინა კვირა
            </button>
            <button className="px-4 py-2 text-xs font-semibold text-white transition bg-teal-600 shadow-sm hover:bg-teal-500 rounded-xl">
              შემდეგი კვირა →
            </button>
          </div>
        </div>

        {/* Schedule Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {scheduleData.map((item, index) => (
            <div key={index} className="flex flex-col overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">
              <div className="px-4 py-3 border-b bg-slate-100/80 border-slate-200">
                <h3 className="text-xs font-bold tracking-wide uppercase text-slate-700">
                  {item.day}
                </h3>
              </div>

              <div className="flex-1 p-4 space-y-3">
                {item.slots.map((slot) => (
                  <div 
                    key={slot.id}
                    className="p-3 space-y-2 transition border rounded-xl border-slate-100 bg-slate-50 hover:border-slate-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-slate-800">{slot.time}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        slot.status === 'თავისუფალი' 
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                          : 'bg-rose-100 text-rose-700 border border-rose-200'
                      }`}>
                        {slot.status}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-slate-600">{slot.doctor}</p>

                    {slot.status === 'თავისუფალი' && (
                      <button 
                        onClick={() => handleOpenBooking(slot)}
                        className="w-full mt-1 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-lg shadow-sm transition active:scale-95"
                      >
                        დაჯავშნა
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* მოდალური ფანჯარა ჯავშნისთვის */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="ვიზიტის დაჯავშნა"
      >
        {selectedSlot && (
          <form onSubmit={handleConfirmBooking} className="space-y-4">
            <div className="p-3 space-y-1 text-xs text-teal-800 border border-teal-200 bg-teal-50 rounded-xl">
              <p><strong>ექიმი:</strong> {selectedSlot.doctor}</p>
              <p><strong>დრო:</strong> {selectedSlot.time}</p>
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-700">
                პაციენტის სახელი და გვარი *
              </label>
              <input 
                type="text" 
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="მაგ: გიორგი გიორგაძე"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-700">
                ტელეფონის ნომერი *
              </label>
              <input 
                type="tel" 
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="599 00 00 00"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {formError && (
              <p className="text-xs font-medium text-rose-600">{formError}</p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold transition bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200"
              >
                გაუქმება
              </button>
              <button 
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white transition bg-teal-600 shadow-sm hover:bg-teal-500 rounded-xl"
              >
                დადასტურება
              </button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
}