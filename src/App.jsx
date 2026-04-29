import { useEffect, useState } from "react";
import "./style.css";
import api from "./provider/api";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null);

  const [numeroPoke, setNumeroPoke] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png",
  );

  const [modalAberto, setModalAberto] = useState(false);
  const [modalDeletarAberto, setModalDeletarAberto] = useState(false);
  const [metodoSelecionado, setMetodoSelecionado] = useState("");

  useEffect(() => {
    api
      .get("/pokemon")
      .then((response) => setPokemon(response.data))
      .catch((error) => console.log(error));
  }, []);

  function carregarPokemons() {
    api.get("/pokemon").then((response) => setPokemon(response.data));
  }

  function salvar() {
    const dados = { nome, tipo, descricao, imagem };

    if (metodoSelecionado === "create") {
      api.post("/pokemon", dados).then(() => {
        carregarPokemons();
        setModalAberto(false);
        limparCampos();
      });
    } else {
      api.put(`/pokemon/${pokemonSelecionado}`, dados).then(() => {
        carregarPokemons();
        setModalAberto(false);
        limparCampos();
      });
    }
  }

  function excluir() {
    api.delete(`/pokemon/${pokemonSelecionado}`).then(() => {
      carregarPokemons();
      setModalDeletarAberto(false);
      setPokemonSelecionado(null);
    });
  }

  function limparCampos() {
    setNome("");
    setTipo("");
    setDescricao("");
    setNumeroPoke("");
    setImagem(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png",
    );
    setPokemonSelecionado(null);
  }

  return (
    <>
      <h1 className="title">Pokédex!</h1>

      <div className="group-btn">
        <button
          onClick={() => {
            limparCampos();
            setMetodoSelecionado("create");
            setModalAberto(true);
          }}
        >
          Cadastrar Pokémon
        </button>
      </div>

      <div className="container">
        {pokemon.map((poke) => (
          <div className="card" key={poke.id}>
            <div className="imagem-card">
              <img src={poke.imagem || null} alt={poke.nome} />
            </div>
            <div className="conteudo-card">
              <div className="conteudo-numero">
                <p>N° {poke.id}</p>
              </div>
              <h2>{poke.nome}</h2>
              <p>{poke.descricao}</p>
              <div className="conteudo-tipo">
                <p>{poke.tipo}</p>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="btn-editar"
                  onClick={() => {
                    setPokemonSelecionado(poke.id);
                    setNome(poke.nome);
                    setTipo(poke.tipo);
                    setDescricao(poke.descricao);
                    setImagem(poke.imagem);
                    setMetodoSelecionado("update");
                    setModalAberto(true);
                  }}
                >
                  Editar
                </button>

                <button
                  className="btn-editar"
                  style={{ backgroundColor: "#ff4d4d" }}
                  onClick={() => {
                    setPokemonSelecionado(poke.id);
                    setModalDeletarAberto(true);
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal">
            <span
              className="close"
              onClick={() => {
                setModalAberto(false);
                limparCampos();
              }}
            >
              X
            </span>
            <div className="content-data">
              <h2>
                {metodoSelecionado === "create" ? "Novo" : "Editar"} Pokémon
              </h2>

              <div className="input-group">
                <label>Nome:</label>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  type="text"
                />
              </div>

              <div className="input-group">
                <label>Tipo:</label>
                <input
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  type="text"
                />
              </div>

              <div className="input-group">
                <label>Descrição:</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>

              <button onClick={salvar}>Salvar</button>
            </div>

            <div className="linha-vertical"></div>

            <div className="img-poke">
              <div className="input-group">
                <label>N° Pokémon:</label>
                <input
                  value={numeroPoke}
                  onChange={(e) => {
                    setNumeroPoke(e.target.value);
                    if (e.target.value != "") {
                      setImagem(
                        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.target.value}.png`,
                      );
                    } else {
                      setImagem(
                        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png`,
                      );
                    }
                  }}
                  type="number"
                />
              </div>
              <img src={imagem || null} />
            </div>
          </div>
        </div>
      )}

      {modalDeletarAberto && (
        <div className="modal-overlay">
          <div
            className="modal"
            style={{ flexDirection: "column", textAlign: "center" }}
          >
            <h2>Deletar Pokémon?</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setModalDeletarAberto(false)}
                style={{ backgroundColor: "gray" }}
              >
                Cancelar
              </button>

              <button onClick={excluir} style={{ backgroundColor: "#ff4d4d" }}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
