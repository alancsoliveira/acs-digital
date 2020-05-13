import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';

export default function AllFamily() {
    const [family, setFamily] = useState([]);
    const [total, setTotal] = useState(0);

    const history = useHistory();

    const familyId = localStorage.getItem('familyId');

    useEffect(() => {
        api.get('family', {
            headers: {
                Authorization: familyId,
            }
        }).then(Response => {
            setFamily(Response.data);
            setTotal(Response.data.length)

        })
    }, [familyId]);

    async function handleDeleteFamily(id) {

        const response = await api.get(`profile/`, {
            headers: {
                Authorization: id,
            }
        });
        console.log(id)
        console.log(response.data)

        try {

            if (response.data.length === 0) {
                await api.delete(`family/${id}`, {
                    headers: {
                        Authorization: familyId,
                    }
                });
                setFamily(family.filter(family => family.id !== id))
            } else {
                alert('Família possui integrantes!');
            }
        } catch (error) {
            alert('Erro ao deletar membro da família.');
        }

    }

    async function handleLoginFamily(id) {

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('familyId', id);
            localStorage.setItem('familyResponsible_name', response.data.responsible_name);

            history.push('/profile');
        } catch (error) {
            alert('Falha no login, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/')
    }

    return (
        <div className="all-family-container">
            <header>
                <img src={logoImg} alt="ACS Digital" />
                <span>Esse menu lista todas as <strong>famílias</strong> cadastradas!</span>

                <Link className="button" to="register">Cadastrar uma nova família</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#0078c8" />
                </button>
            </header>
            <h1>Total de Famílias Encontradas: {total} </h1>

            <ul>
                {family.map(family => (
                    <li key={family.id}>


                        <strong>NOME DO RESPONSÁVEL FAMILIAR:</strong>
                        <p>{family.responsible_name}</p>

                        <strong>ENDEREÇO:</strong>
                        <p>{family.neighborhood}</p>

                        <strong>NÚMERO DA RESIDÊNCIA:</strong>
                        <p>{family.number}</p>

                        <strong>CIDADE:</strong>
                        <p>{family.city}</p>

                        <strong>UF:</strong>
                        <p>{family.uf}</p>

                        <strong>ID DA FAMÍLIA:</strong>
                        <p><strong>{family.id}</strong></p>

                        <button onClick={() => handleDeleteFamily(family.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>

                        <button onClick={() => handleLoginFamily(family.id)} type="button">
                            <FiLogIn size={20} color="#0078c8" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}