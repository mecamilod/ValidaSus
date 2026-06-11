// base_sigtap.js
window.baseProcedimentosSIGTAP = {
    "Deficiência Física e Sensório-Motora (Múltiplas)": {
        "forma_organizacao": "01 - Atenção Especializada em Reabilitação",
        "procedimentos": [
            {
                "codigo": "0301070130",
                "nome": "TRATAMENTO INTENSIVO DE PACIENTE EM REABILITAÇÃO FÍSICA (2 TURNOS PACIENTE-DIA - 20 ATENDIMENTOS-MÊS)",
                "descricao": "Conjunto de atividades assistenciais sequenciais e integradas, de caráter multiprofissional, destinadas a pacientes com perda funcional e/ou motora severa crônica ou aguda. O tratamento exige acompanhamento coordenado e intensivo para maximizar o ganho de independência funcional, com avaliação biopsicossocial integrada, integração ortopédica e prescrição/adequação de tecnologias assistivas e cadeiras de rodas.",
                "complexidade": "MC - Média Complexidade",
                "instrumento_registro": "02 - BPA (Individualizado)",
                "restricao_etaria": "Idade Mínima: 0 Mes(es) | Idade Máxima: 130 Ano(s)",
                "valor_ambulatorial": 33.70,
                "cbos": ["223605 - Fisioterapeuta", "223650 - Fisio Neuro", "223660 - Fisio Ortopedia", "223905 - Terapeuta Ocupacional", "225140 - Médico Fisiatra", "225270 - Médico Ortopedista"],
                "cids": ["G800", "G801", "G802", "G809", "G810", "G820", "G823", "I64", "I694", "M210", "S141", "Z890", "Z894", "Z899"]
            }
        ]
    },
    "Deficiência Visual": {
        "forma_organizacao": "01 - Atenção Especializada em Reabilitação",
        "procedimentos": [
            {
                "codigo": "0301070148",
                "nome": "TREINO DE ORIENTAÇÃO E MOBILIDADE",
                "descricao": "Processo de reabilitação global focado no desenvolvimento de competências cognitivas e motoras que permitam à pessoa com cegueira ou baixa visão locomover-se de forma independente, segura e eficiente em ambientes internos e externos, utilizando técnicas de proteção, guia humano e bengala longa.",
                "complexidade": "MC - Média Complexidade",
                "instrumento_registro": "02 - BPA (Individualizado)",
                "restricao_etaria": "Idade Mínima: 0 Mes(es) | Idade Máxima: 130 Ano(s)",
                "valor_ambulatorial": 6.00,
                "cbos": ["223605 - Fisioterapeuta", "223905 - Terapeuta Ocupacional", "239415 - Pedagogo Especializado", "251510 - Psicólogo Clínico"],
                "cids": ["H540", "H541", "H542", "H544"]
            }
        ]
    },
    "Práticas Integrativas e Complementares (PICS)": {
        "forma_organizacao": "05 - Práticas Integrativas e Complementares",
        "procedimentos": [
            {
                "codigo": "0309050014",
                "nome": "SESSÃO DE ACUPUNTURA APLICAÇÃO DE VENTOSAS / MOXA",
                "descricao": "Abordagem terapêutica que estimula pontos específicos do corpo através do calor (queima de moxa) ou vácuo mecânico (ventosaterapia). Indicado para modulação de dores crônicas, redução de espasmos e manejo do estresse.",
                "complexidade": "MC - Média Complexidade",
                "instrumento_registro": "01-BPA (Consolidado), 02-BPA (Individualizado)",
                "restricao_etaria": "Idade Mínima: 0 Mes(es) | Idade Máxima: 130 Ano(s)",
                "valor_ambulatorial": 3.67,
                "cbos": ["223605 - Fisioterapeuta", "223905 - Terapeuta Ocupacional", "223293 - Dentista", "225103 - Médico"],
                "cids": ["F430", "F431", "G430", "G442", "M541", "M545", "M791", "R520"]
            }
        ]
    },
    "Saúde Bucal e Manejo Clínico PcD": {
        "forma_organizacao": "02 - Procedimentos Odontológicos Especializados",
        "procedimentos": [
            {
                "codigo": "0307010147",
                "nome": "ADEQUAÇÃO DO COMPORTAMENTO DA PESSOA COM DEFICIÊNCIA EM ODONTOLOGIA",
                "descricao": "Intervenção clínica focada no acolhimento, estabilização protetiva e técnicas de condicionamento psicológico para viabilizar a assistência odontológica segura a pacientes com alterações neuromotoras, cognitivas ou intelectuais em nível ambulatorial.",
                "complexidade": "AB - Atenção Básica",
                "instrumento_registro": "02 - BPA (Individualizado)",
                "restricao_etaria": "Idade Mínima: 12 Mes(es) | Idade Máxima: 130 Ano(s)",
                "valor_ambulatorial": 0.00,
                "cbos": ["223208 - Cirurgião-Dentista", "223212 - Odontopediatra", "223276 - Dentista PcD"],
                "cids": ["G800", "G809", "F70", "F71", "F72", "F840", "Q059"]
            }
        ]
    }
};
