import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useJwt } from "../../Context/JwtContext";

function AuthCallback() {
    const { fetchToken } = useJwt();
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            await fetchToken();
            navigate("/profile"); 
        };
        loadUser();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <h2 className="text-xl font-semibold">Authenticating...</h2>
        </div>
    );
}

export default AuthCallback
