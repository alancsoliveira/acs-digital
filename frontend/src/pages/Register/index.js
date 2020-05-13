import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import '../../services/api'
import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Register() {
    const [responsible_name, setResponsible_name] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = ({
            responsible_name,
            neighborhood,
            number,
            city,
            uf,
        });

        if (data.responsible_name === '' || data.neighborhood === '' || data.number === '' || data.city === '' || data.uf === '') {
            alert('Preencha todos os campos para continuar!')
        } else {
            try {

                const response = await api.post('family', data);

                alert(`Família cadastrada com sucesso, o ID dela é: ${response.data.id}`);

                history.push('/family'); //Mudar isso para enviar usuario para cadastro de membros de família
            } catch (error) {
                alert('Erro no cadastro, tente novamente.');
            }
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="ACS Digital" />

                    <h1>Cadastro</h1>
                    <p>Faça o cadastro de uma nova família e em seguido adicone membros a ela.</p>

                    <Link className="back-link" to="/family">
                        <FiArrowLeft size={16} color="#0078c8" />
                        Voltar para Famílias
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Responsável Familiar"
                        value={responsible_name}
                        onChange={e => setResponsible_name(e.target.value)}
                    />
                    <input placeholder="Endereço"
                        value={neighborhood}
                        onChange={e => setNeighborhood(e.target.value)}
                    />
                    <input placeholder="Número da residência"
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder="UF" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}