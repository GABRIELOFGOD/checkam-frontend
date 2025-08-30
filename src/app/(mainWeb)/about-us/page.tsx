const AboutUs = () => {
  return (
    <div className="px-3 md:px-0">
      <div className="py-10 md:py-20 container mx-auto flex flex-col gap-16 md:gap-24">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">About Us</h1>
          <p className="text-gray-600">
            Learn more about our mission, vision, and the values that drive us.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl shadow-sm border bg-white">
            <h2 className="text-xl font-semibold mb-3">Mission</h2>
            <p className="text-gray-600">
              To connect young people with their lawmakers and make the government
              more open, transparent, and accountable.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow-sm border bg-white">
            <h2 className="text-xl font-semibold mb-3">Vision</h2>
            <p className="text-gray-600">
              A future where every young person is informed, engaged, and able to
              participate and influence decisions that affect them.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Transparency",
                desc: "Open access to information."
              },
              {
                title: "Engagement",
                desc: "Active participation of citizens."
              },
              {
                title: "Accountability",
                desc: "Leaders answer to the people."
              }
            ].map((value, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl shadow-sm border bg-white text-center"
              >
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div
                key={member}
                className="p-6 rounded-2xl shadow-sm border bg-white flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
                <h3 className="text-lg font-semibold">Member Name</h3>
                <p className="text-sm text-gray-500 mb-2">Position / Role</p>
                <p className="text-gray-600">
                  Short bio about the team member, their background and role.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Partners & Supporters
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {[1, 2, 3, 4].map((logo) => (
              <div
                key={logo}
                className="h-16 bg-gray-100 rounded-xl flex items-center justify-center"
              >
                <span className="text-gray-400 text-sm">Logo</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
