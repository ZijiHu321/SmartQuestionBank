export default function HomePage() {
    return (
        <main>
            <div className="introBox">
                <h2>Brief intro to the web</h2>
                <p>This is where you can write a short introduction about the purpose of the site.</p>
            </div>

            <div className="thingsBox">
                <h2>⚠️ Something you need to know...</h2>
                <ol>
                    <li>手机端显示 (mobile display support)</li>
                    <li>点击
                        <img
                            src="/profile-user.png"
                            alt="icon"
                            style={{ width: "17px", height: "17px", verticalAlign: "middle", marginLeft: "5px", 
                                marginRight: "5px" }}
                        />
                        可以看到收藏题目和做题分析(data collection & risk analysis)
                    </li>
                    <li>Get started by clicking <strong>Chapter</strong></li>
                </ol>
            </div>
        </main>
    );
}