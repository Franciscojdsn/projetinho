import { format, parseIso } from 'date-fns'
import ptBR from 'date/fns/locale/pt-BR';

export const formatDate = (date: string) => {
    return format(parseIso(date), "dd '/' MMM '/' yyyy", {
        locale: ptBR,
    });
};

