import { useTheme } from "../Context/ThemeContext";

export default function Documentation() {
    const { isDarkMode } = useTheme();

    return (
        <div
            className={`min-h-screen py-10 px-6 ${
                isDarkMode
                    ? "bg-gray-900 text-gray-200"
                    : "bg-gray-100 text-gray-800"
            }`}
        >
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">
                    System Design Simulator
                </h1>

                {/* INTRODUCTION */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
                    <p className="leading-relaxed">
                        System Design Simulator is a visual tool that allows
                        users to create scalable architecture diagrams using
                        drag and drop components. The platform supports real time
                        editing, node customization, authentication, saving
                        designs and more.
                    </p>
                </section>

                {/* NODE DOCUMENTATION */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-3">
                        Available Nodes and Their Meaning
                    </h2>

                    <p className="mb-3">
                        <strong>Client:</strong> Represents the end user who
                        interacts with your application.
                    </p>

                    <p className="mb-3">
                        <strong>Web Server:</strong> Handles static content,
                        routing and serves front end files.
                    </p>

                    <p className="mb-3">
                        <strong>Application Server:</strong> Executes backend
                        logic, APIs and business rules.
                    </p>

                    <p className="mb-3">
                        <strong>Database Server:</strong> Stores persistent
                        structured data.
                    </p>

                    <p className="mb-3">
                        <strong>Cache:</strong> Stores frequently accessed data
                        for faster retrieval.
                    </p>

                    <p className="mb-3">
                        <strong>Load Balancer:</strong> Distributes incoming
                        traffic across multiple application servers.
                    </p>

                    <p className="mb-3">
                        <strong>API Gateway:</strong> Entry point for all APIs.
                        Manages authentication, routing and rate limiting.
                    </p>

                    <p className="mb-3">
                        <strong>Message Queue:</strong> Enables asynchronous
                        communication between services.
                    </p>

                    <p className="mb-3">
                        <strong>Object Storage:</strong> Stores large files such
                        as images, videos and logs.
                    </p>

                    <p className="mb-3">
                        <strong>CDN:</strong> Distributes cached content
                        globally for faster delivery.
                    </p>

                </section>

                {/* AUTHENTICATION DOCUMENTATION */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-3">
                        Authentication System
                    </h2>

                    <p className="mb-3">
                        The System Design Simulator supports email and password
                        login as well as Google OAuth. JWT is used for session
                        handling and passwords are securely stored using Bcrypt.
                    </p>

                    <p className="mb-2 font-semibold">Manual Signup</p>
                    <p className="mb-3">
                        Users provide name, email and password. The password is
                        hashed using Bcrypt before saving in the database.
                    </p>

                    <p className="mb-2 font-semibold">Manual Login</p>
                    <p className="mb-3">
                        The system validates the entered password by comparing it
                        with the Bcrypt hash stored in the database.
                    </p>

                    <p className="mb-2 font-semibold">Google OAuth Login</p>
                    <p className="mb-3">
                        Users can authenticate using Google. The backend verifies
                        the Google token and generates a JWT for the session.
                    </p>

                    <p className="mb-2 font-semibold">JWT Creation</p>
                    <p className="mb-3">
                        After successful authentication, a JWT valid for one day
                        is generated and stored in an HTTP only cookie.
                    </p>

                    <p className="mb-2 font-semibold">Logout</p>
                    <p>
                        Logout clears the cookie that contains the JWT token and
                        ends the session.
                    </p>
                </section>

                {/* SAVE DESIGN */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-3">Saving Designs</h2>
                    <p className="leading-relaxed">
                        When a user saves a design, the system stores the entire
                        graph structure including nodes, edges, RPS, SLA,
                        metadata, title, description and optional thumbnail. Each
                        saved design is connected to the user account using the
                        email extracted from the JWT token.
                    </p>
                </section>

                {/* FOOTER */}
                <section className="mt-12 text-center">
                    <p className="text-lg">
                        Built by <strong>Mansi Sharma</strong>
                    </p>
                    <a
                        href="https://github.com/Mansi07Sharma"
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit My GitHub
                    </a>
                </section>
            </div>
        </div>
    );
}
