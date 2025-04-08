import stilo from "./ListaBoletos.module.css";

export default function ListaBoletos({ key, mes_referente, vencimento, valor, icone }) {

    return (
        <>
            <div key={key} className={stilo.containerboletos}>
                <li>
                    <div>
                        <p>{mes_referente}</p>
                    </div>
                    <div>
                        <p>{vencimento}</p>
                    </div>
                    <div>
                        <p>{valor}</p>
                    </div>
                    <div>
                            <p>{icone}</p>
                    </div>
                </li>
            </div>
        </>
    )

}