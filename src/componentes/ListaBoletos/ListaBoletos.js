import stilo from "./ListaBoletos.module.css";
import Botao from "../Botao/index"
import { IoTrashBinOutline } from "react-icons/io5";

export default function ListaBoletos({ key, mes_referente, vencimento, valor, botao, iconeVencido }) {

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
                        <span>{iconeVencido}</span>
                    <div>
                        {botao}          
                    </div>
                </li>
            </div>
        </>
    )

}