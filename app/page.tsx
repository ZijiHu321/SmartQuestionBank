export default function HomePage() {
    return (
        <main>
            <div className="introBox">
                <h2>Brief intro to the web</h2>
                <p>Hi, warriors!

                    Welcome to your Smart Question Bank – your secret weapon for conquering the exams.

                    Here you can find our original ib style questions and real past paper questions. It's also your personal training ground with smart diagnosis. Every question you practice is analyzed to pinpoint your exact strengths and weaknesses.

                    Forget generic studying. Focus your energy where it matters most, turn weaknesses into strengths, and walk into your exams with unshakable confidence.

                    Your journey to a 45 starts here. Let’s get to work.
                </p>
            </div>

            <div className="thingsBox">
                <h2>⚠️ Something you need to know...</h2>
                <ol>
                    <li>Mobile display support</li>
                    <li>Click on
                        <img
                            src="/profile-user.png"
                            alt="icon"
                            style={{
                                width: "17px", height: "17px", verticalAlign: "middle", marginLeft: "5px",
                                marginRight: "5px"
                            }}
                        />
                        you can see marked questions and practice analysis
                    </li>
                    <li>Get started by clicking <strong>Chapter</strong></li>
                </ol>
            </div>
        </main>
    );
}