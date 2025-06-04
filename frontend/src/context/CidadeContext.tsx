import { createContext, useContext, useState, ReactNode } from "react";

interface Cidade {
  id: number;
  nome: string;
  lat: number;
  lon: number;
}

export interface Irradiacao {
  id: number;
  lon: number;
  lat: number;
  anual: number;
  jan: number;
  fev: number;
  mar: number;
  abr: number;
  mai: number;
  jun: number;
  jul: number;
  ago: number;
  set: number;
  out: number;
  nov: number;
  dez: number;
  geom: string; // WKT do polígono
}


interface CidadeContextType {
  cidades: Cidade[];
  setCidades: (cidades: Cidade[]) => void;
  irradiacao: Irradiacao | null;
  setIrradiacao: (irradiacao: Irradiacao | null) => void;
}

const CidadeContext = createContext<CidadeContextType | undefined>(undefined);

export function CidadeProvider({ children }: { children: ReactNode }) {
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [irradiacao, setIrradiacao] = useState<Irradiacao | null>(null);

  return (
    <CidadeContext.Provider value={{ cidades, setCidades, irradiacao, setIrradiacao }}>
      {children}
    </CidadeContext.Provider>
  );
}

export function useCidadeContext() {
  const context = useContext(CidadeContext);
  if (!context) {
    throw new Error("useCidadeContext deve ser usado dentro de CidadeProvider");
  }
  return context;
}
