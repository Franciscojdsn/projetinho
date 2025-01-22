import PropTypes from 'prop-types';

function Item ({aluno="Falta Nome", responsavel="Sem Nome"}) {
    return (
        <>
            <li>{aluno} - {responsavel}</li>
        </>

    )

}

Item.propTypes = {
    aluno: PropTypes.string.isRequired,
    responsavel: PropTypes.string.isRequired,

}

export default Item;