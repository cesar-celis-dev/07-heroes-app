import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";



export const LoginScreen = () => {


  const [value, handleInputChange] = useForm({
    id:"",
});

const {id, } = value;
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/search",{
      replace:true
    })
  }

  return (
    <div className="container mt-5">
        <h1>Login</h1>
        <hr />
      <div>
          <div>
            <img src="/assets/allheroes.jpg" alt="allHeroes" className="allheroes" />
          </div>

          <div className="divLogin">
            <input
                  type="text"
                  name="id"
                  className="form-control"
                  placeholder="Ingresa Id"
                  autoComplete="off"
                  value={id}
                  onChange={handleInputChange}
            />
            {id==="Developer"&&
            <div>
              <button
                className="btn btn-primary"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            }
          </div>
      </div>

    </div>
    

  )
}
