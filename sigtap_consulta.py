"""
Módulo para consulta rápida de dados SIGTAP SUS
Estrutura de dados padronizada para procedimentos médicos
"""

from dataclasses import dataclass, field
from typing import List, Dict, Optional
from enum import Enum


class Complexidade(Enum):
    """Níveis de complexidade dos procedimentos"""
    AC = "AC - Atenção Básica"
    MC = "MC - Média Complexidade"
    AC_ESP = "AC-E - Atenção Básica Especializada"
    
    
class Modalidade(Enum):
    """Modalidades de atendimento"""
    AMBULATORIAL = "01 - Ambulatorial"
    HOSPITALAR = "02 - Hospitalar"
    HOSPITAL_DIA = "03 - Hospital Dia"
    ATENCAO_DOMICILIAR = "06 - Atenção Domiciliar"


class TipoRegistro(Enum):
    """Tipos de registro de procedimentos"""
    BPA_CONSOLIDADO = "01 - BPA (Consolidado)"
    BPA_INDIVIDUALIZADO = "02 - BPA (Individualizado)"
    AIH_SECUNDARIO = "05 - AIH (Proc. Secundário)"


@dataclass
class RestretoEtaria:
    """Restrições etárias para procedimentos"""
    idade_minima_meses: int = 0
    idade_maxima_anos: int = 130
    
    def __str__(self) -> str:
        return f"Idade Mínima: {self.idade_minima_meses} Mes(es) | Idade Máxima: {self.idade_maxima_anos} Ano(s)"


@dataclass
class ValorProcedimento:
    """Estrutura de valores do procedimento"""
    valor_ambulatorial_sa: float
    valor_ambulatorial_total: float
    valor_hospitalar: Optional[float] = None
    valor_hospital_dia: Optional[float] = None
    valor_domiciliar: Optional[float] = None
    
    def __str__(self) -> str:
        valores = f"Valor Ambulatorial SA: {self.valor_ambulatorial_sa:.2f} | Valor Ambulatorial Total: {self.valor_ambulatorial_total:.2f}"
        if self.valor_hospitalar:
            valores += f" | Valor Hospitalar: {self.valor_hospitalar:.2f}"
        if self.valor_hospital_dia:
            valores += f" | Valor Hospital Dia: {self.valor_hospital_dia:.2f}"
        if self.valor_domiciliar:
            valores += f" | Valor Domiciliar: {self.valor_domiciliar:.2f}"
        return valores


@dataclass
class ProcedimentoSIGTAP:
    """Estrutura principal de um procedimento SIGTAP"""
    codigo: str
    nome: str
    complexidade: Complexidade
    modalidades: List[Modalidade] = field(default_factory=list)
    registros: List[TipoRegistro] = field(default_factory=list)
    restricao_etaria: RestretoEtaria = field(default_factory=RestretoEtaria)
    cids_vinculados: List[str] = field(default_factory=list)
    valores: Optional[ValorProcedimento] = None
    classes_deficiencia: str = "Não se Aplica"
    ativo: bool = True
    
    def __str__(self) -> str:
        """Representação em string formatada"""
        output = f"""
╔══════════════════════════════════════════════════════╗
║ PROCEDIMENTO SIGTAP - SUS                           ║
╚══════════════════════════════════════════════════════╝

Código: {self.codigo}
Nome: {self.nome}
Classes de Deficiência: {self.classes_deficiencia}
Complexidade: {self.complexidade.value}
Status: {'Ativo' if self.ativo else 'Inativo'}

📋 MODALIDADES ({len(self.modalidades)}):
{self._format_list([m.value for m in self.modalidades])}

📝 TIPOS DE REGISTRO ({len(self.registros)}):
{self._format_list([r.value for r in self.registros])}

👶 RESTRIÇÃO ETÁRIA:
{self.restricao_etaria}

🏥 CIDs VINCULADOS ({len(self.cids_vinculados)}):
{self._format_list(self.cids_vinculados)}

💰 VALORES:
{self.valores if self.valores else 'Informação não disponível'}
        """
        return output.strip()
    
    @staticmethod
    def _format_list(items: List[str], indent: int = 2) -> str:
        """Formata lista com indentação"""
        if not items:
            return " " * indent + "Nenhum item"
        return "\n".join([f"{' ' * indent}• {item}" for item in items])
    
    def to_dict(self) -> Dict:
        """Converte para dicionário"""
        return {
            'codigo': self.codigo,
            'nome': self.nome,
            'classes_deficiencia': self.classes_deficiencia,
            'complexidade': self.complexidade.value,
            'modalidades': [m.value for m in self.modalidades],
            'registros': [r.value for r in self.registros],
            'restricao_etaria': str(self.restricao_etaria),
            'cids_vinculados': self.cids_vinculados,
            'valores': str(self.valores) if self.valores else None,
            'ativo': self.ativo
        }


class ConsultorSIGTAP:
    """Consultor de procedimentos SIGTAP"""
    
    def __init__(self):
        self.base_dados: List[ProcedimentoSIGTAP] = []
    
    def adicionar_procedimento(self, procedimento: ProcedimentoSIGTAP) -> None:
        """Adiciona um procedimento à base de dados"""
        self.base_dados.append(procedimento)
    
    def buscar_por_codigo(self, codigo: str) -> Optional[ProcedimentoSIGTAP]:
        """Busca procedimento por código"""
        for proc in self.base_dados:
            if proc.codigo == codigo:
                return proc
        return None
    
    def buscar_por_nome(self, nome: str, exato: bool = False) -> List[ProcedimentoSIGTAP]:
        """Busca procedimentos por nome"""
        resultado = []
        nome_lower = nome.lower()
        
        for proc in self.base_dados:
            if exato:
                if proc.nome.lower() == nome_lower:
                    resultado.append(proc)
            else:
                if nome_lower in proc.nome.lower():
                    resultado.append(proc)
        
        return resultado
    
    def buscar_por_complexidade(self, complexidade: Complexidade) -> List[ProcedimentoSIGTAP]:
        """Busca procedimentos por complexidade"""
        return [p for p in self.base_dados if p.complexidade == complexidade]
    
    def buscar_por_cid(self, cid: str) -> List[ProcedimentoSIGTAP]:
        """Busca procedimentos vinculados a um CID"""
        return [p for p in self.base_dados if cid in p.cids_vinculados]
    
    def buscar_por_modalidade(self, modalidade: Modalidade) -> List[ProcedimentoSIGTAP]:
        """Busca procedimentos por modalidade"""
        return [p for p in self.base_dados if modalidade in p.modalidades]
    
    def listar_todos(self) -> List[ProcedimentoSIGTAP]:
        """Lista todos os procedimentos"""
        return self.base_dados


# Exemplo de uso
if __name__ == "__main__":
    # Criar consultor
    consultor = ConsultorSIGTAP()
    
    # Criar procedimento exemplo
    procedimento = ProcedimentoSIGTAP(
        codigo="0309050014",
        nome="SESSÃO DE ACUPUNTURA APLICAÇÃO DE VENTOSAS / MOXA",
        complexidade=Complexidade.MC,
        modalidades=[
            Modalidade.AMBULATORIAL,
            Modalidade.HOSPITALAR,
            Modalidade.HOSPITAL_DIA,
            Modalidade.ATENCAO_DOMICILIAR
        ],
        registros=[
            TipoRegistro.BPA_CONSOLIDADO,
            TipoRegistro.BPA_INDIVIDUALIZADO,
            TipoRegistro.AIH_SECUNDARIO
        ],
        restricao_etaria=RestretoEtaria(idade_minima_meses=0, idade_maxima_anos=130),
        cids_vinculados=["F430", "F431", "F432", "G430", "G431", "G442", "M541", 
                        "M542", "M544", "M545", "M791", "R51", "R520", "R521", "R522"],
        valores=ValorProcedimento(
            valor_ambulatorial_sa=3.67,
            valor_ambulatorial_total=3.67
        )
    )
    
    # Adicionar à base
    consultor.adicionar_procedimento(procedimento)
    
    # Consultar
    print(procedimento)
    print("\n" + "="*60 + "\n")
    
    # Buscar por código
    resultado = consultor.buscar_por_codigo("0309050014")
    if resultado:
        print(f"✅ Procedimento encontrado:")
        print(resultado.to_dict())
