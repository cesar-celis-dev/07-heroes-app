import { useForm } from "../hooks/useForm";
import {getHeroesByName} from "../../selectors/getHeroesByName";
import {HeroCard} from "../hero/HeroCard";
import {useNavigate, useLocation} from "react-router-dom";
import queryString from "query-string"
import { useEffect, useMemo } from "react";


export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const {q = ""} = queryString.parse(location.search) //se desestructura query

    const [ {searchText}, handleInputChange] = useForm( {
      searchText:q
    } );

    useEffect(() => {
      
      if(searchText){
        navigate(`?q=${searchText}`);
      }
    
    }, [searchText])
    
    const heroesFiltered = useMemo(() => {
      return getHeroesByName(q);
    },[q])
    
    // const instantSearch = (e) => {
    //   handleInputChange(e);
    //   navigate(`?q=${searchText}`);
    // }

    const handleSearch = (e) => {
      e.preventDefault();
      navigate(`?q=${searchText}`) //http://localhost:3000/search?q=
      
    }

      return (
        <>
            <h1>Búsqueda</h1>
            <hr />
            
            <div className="row">

              <div className="col-5">

                <h4>Buscar</h4>
                <hr />

                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Buscar"
                    className="form-control"
                    name="searchText"
                    autoComplete="off"
                    value={searchText}
                    onChange={handleInputChange}
                  />

                  <button 
                      type="submit"
                      className="btn btn-outline-primary mt-1"
                  >
                      Buscar
                  </button>

                </form>

              </div>

              <div className="col-7">
                  <h4>Resultados</h4>
                  <hr />

                  {
                    (q==="")
                    ? <div className="alert alert-info"> Busca un Héroe </div>
                    : (heroesFiltered.length === 0)
                      && <div className="alert alert-danger">No hay resultados para: {q}</div>
                  }

                  {
                    heroesFiltered.map(hero => (
                      <HeroCard 
                          key={hero.id}
                          {...hero}
                          
                      />
                    ))
                  }

              </div>

            </div>

        </>
      )
}
