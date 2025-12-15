import React from "react"
import { useNavigate } from "react-router-dom"

const academicsData = [
  {
    title: "Curriculum",
    desc: "Outcome-based curriculum aligned with industry and academic standards.",
    path: "/curriculum",
  },
  {
    title: "Programs Offered",
    desc: "Undergraduate, Postgraduate and Doctoral programs across disciplines.",
  },
  {
    title: "Academic Regulations",
    desc: "Rules governing examinations, evaluation and grading systems.",
  },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="w-full bg-[#f2f5fb]">

      {/* ================= HERO SECTION ================= */}
      <section
        className="relative h-[70vh] flex items-center"
        style={{
          backgroundImage: "url('/academics-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0f1e4d]/75" />

        {/* LEFT-ALIGNED CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-10 w-full">
          <div className="max-w-xl">

            <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-wide mb-4">
              ACADEMICS
            </h1>

            {/* ❌ White background REMOVED */}
            <p className="text-blue-100 text-lg md:text-xl font-medium leading-relaxed">
              Delivering excellence in education through innovation,
              research and outcome-based learning.
            </p>

          </div>
        </div>
      </section>

      {/* ================= ABOUT ACADEMICS ================= */}
      <section className="-mt-24 relative z-20">
        <div className="max-w-7xl mx-auto px-10">
          <div className="bg-[#e9eef9] p-14 grid md:grid-cols-2 gap-12 items-center shadow-xl">

            <div>
              <h2 className="text-3xl font-extrabold text-[#273469] mb-4">
                About Academics
              </h2>

              <div className="w-20 h-1 bg-[#273469] mb-6" />

              <p className="text-gray-800 leading-relaxed text-lg">
                The academic ecosystem at LAKI REDDY BALI REDDY College of Engineering
                is structured to promote intellectual growth, innovation, and
                professional competence. Our programs follow outcome-based education
                and are continuously updated to meet global academic and industry
                requirements.
              </p>
            </div>

            <div className="bg-[#273469] text-white p-10">
              <h3 className="text-2xl font-bold mb-3">
                Outcome-Based Education
              </h3>
              <p className="text-gray-200">
                Curriculum designed to meet NBA, NAAC and global accreditation
                standards with a strong focus on employability and research.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ACADEMIC INFORMATION ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-10">

          <h2 className="text-3xl font-extrabold text-center text-[#273469] mb-12">
            Academic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {academicsData.map((item, index) => (
              <div
                key={index}
                onClick={() => item.path && navigate(item.path)}
                className={`bg-white border-t-8 border-[#273469] p-8 shadow-lg
                transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                ${item.path ? "cursor-pointer" : ""}`}
              >
                <h3 className="text-xl font-bold text-[#273469] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
