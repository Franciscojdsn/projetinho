import stilo from "./ListaBoletosPagos.module.css";
import Botao from "../Botao/index"
import { IoTrashBinOutline } from "react-icons/io5";

export default function ListaBoletosPagos({ key, mes_referente, vencimento, valor, dia, botao }) {

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
                        <p>{dia}</p>
                    </div>
                    <div>
                        {botao}          
                    </div>
                </li>
            </div>
        </>
    )

}