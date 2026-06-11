# ==============================================================================
# REPOSITÓRIO: SIMULADOR INSTITUCIONAL SIGTAP - BASE DE DADOS COMPLETA
# ENGINE: AUTOMATED DATA INGESTION ENGINE (VANILLA JS / NEXT.JS)
# COMPETÊNCIA ATIVA: 06/2026
# STATUS DO CONFIG: HOMOLOGADO / PRODUÇÃO
# ==============================================================================

[config.engine]
auto_parse: true
version: "3.2.0"
target_data_store: "baseProcedimentosSIGTAP"

# ==============================================================================
# CLASSE: DEFICIÊNCIA FÍSICA E SENSÓRIO-MOTORA (MÚLTIPLAS)
# ==============================================================================

---
classe_deficiencia: "Deficiência Física e Sensório-Motora (Múltiplas)"
subclasse: "Tratamento Intensivo e Reabilitação Neurofuncional"
Código: "0301070130"
Nome: "TRATAMENTO INTENSIVO DE PACIENTE EM REABILITAÇÃO FÍSICA (2 TURNOS PACIENTE-DIA - 20 ATENDIMENTOS-MÊS)"
Descrição: "Conjunto de atividades assistenciais sequenciais e integradas, de caráter multiprofissional, destinadas a pacientes com perda funcional e/ou motora severa crônica ou aguda. O tratamento exige acompanhamento coordenado e intensivo para maximizar o ganho de independência funcional, com avaliação biopsicossocial integrada, integração ortopédica e prescrição/adequação de tecnologias assistivas e cadeiras de rodas."
| Complexidade: "MC - Média Complexidade"
| Registro: "02 - BPA (Individualizado)"
| Restrição Etária: "Idade Mínima: 0 Mes(es) | Idade Máxima: 130 Ano(s)"
| CIDs Vinculados: ["A300", "A305", "A309", "B91", "B92", "C716", "C719", "G110", "G112", "G120", "G121", "G122", "G128", "G129", "G20", "G210", "G211", "G212", "G213", "G218", "G219", "G300", "G301", "G308", "G309", "G311", "G318", "G319", "G35", "G379", "G404", "G409", "G459", "G589", "G600", "G603", "G608", "G609", "G610", "G629", "G64", "G700", "G710", "G712", "G728", "G729", "G800", "G801", "G802", "G803", "G804", "G808", "G809", "G810", "G811", "G819", "G820", "G821", "G822", "G823", "G824", "G825", "G831", "G919", "G934", "G938", "G959", "G969", "G979", "I516", "I64", "I691", "I694", "I698", "I739", "M069", "M080", "M139", "M159", "M160", "M169", "M170", "M179", "M199", "M210", "M216", "M300", "M301", "M302", "M303", "M308", "M332", "M340", "M341", "M342", "M348", "M349", "M360", "M361", "M362", "M363", "M364", "M368", "M414", "M45", "M462", "M490", "M491", "M492", "M493", "M494", "M495", "M498", "M800", "M801", "M802", "M803", "M804", "M805", "M808", "M809", "M819", "M869", "M870", "Q039", "Q050", "Q051", "Q052", "Q053", "Q054", "Q055", "Q056", "Q057", "Q058", "Q059", "Q720", "Q721", "Q730", "Q762", "Q780", "Q999", "S062", "S068", "S069", "S122", "S141", "S143", "S241", "S320", "S341", "S383", "S581", "S720", "S780", "S781", "S789", "S880", "S881", "S889", "S984", "T12", "T093", "T903", "T905", "T953", "Z890", "Z891", "Z892", "Z893", "Z894", "Z895", "Z896", "Z897", "Z898", "Z899"]
| CBOs Autorizados: ["223605", "223650", "223660", "223905", "225124", "225140", "225195", "225270"]
valor: 33.70
---

# ==============================================================================
# CLASSE: DEFICIÊNCIA VISUAL
# ==============================================================================

---
classe_deficiencia: "Deficiência Visual"
subclasse: "Tecnologia Assistiva, Orientação e Mobilidade"
Código: "0301070148"
Nome: "TREINO DE ORIENTAÇÃO E MOBILIDADE"
Descrição: "Processo de reabilitação global focado no desenvolvimento de competências cognitivas e motoras que permitam à pessoa com cegueira ou baixa visão locomover-se de forma independente, segura e eficiente em ambientes internos e externos, utilizando técnicas de proteção, guia humano e bengala longa."
| Complexidade: "MC - Média Complexidade"
| Registro: "02 - BPA (Individualizado)"
| Restrição Etária: "Idade Mínima: 0 Mes(es) | Idade Máxima: 130 Ano(s)"
| CIDs Vinculados: ["H540", "H541", "H542", "H544"]
| CBOs Autorizados: ["223605", "223905", "239415", "251510", "251605"]
valor: 6.00
---

# ==============================================================================
# CLASSE: PRÁTICAS INTEGRATIVAS E COMPLEMENTARES (PICS)
# ==============================================================================

---
classe_deficiencia: "Práticas Integrativas e Complementares (PICS)"
subclasse: "Acupuntura e Práticas Tradicionais Chinesas"
Código: "0309050014"
Nome: "SESSÃO DE ACUPUNTURA APLICAÇÃO DE VENTOSAS / MOXA"
Descrição: "Abordagem terapêutica que estimula pontos específicos do corpo através do calor (queima de moxa) ou vácuo mecânico (ventosaterapia). Indicado para modulação de dores crônicas, redução de espasmos e manejo do estresse."
| Complexidade: "MC - Média Complexidade"
| Registro: "01-BPA (Consolidado), 02-BPA (Individualizado), 05-AIH (Proc. Secundário)"
| Restrição Etária: "Idade Mínima: 0 Mes(es) | Idade Máxima: 130 Ano(s)"
| CIDs Vinculados: ["F430", "F431", "F432", "G430", "G431", "G442", "M541", "M542", "M544", "M545", "M791", "R51", "R520", "R521", "R522"]
| CBOs Autorizados: ["223293", "223415", "223505", "223605", "223905", "225103"]
valor: 3.67
---

---
classe_deficiencia: "Práticas Integrativas e Complementares (PICS)"
subclasse: "Acupuntura e Práticas Tradicionais Chinesas"
Código: "0309050022"
Nome: "SESSÃO DE ACUPUNTURA COM INSERÇÃO DE AGULHAS"
Descrição: "Estimulação mecânica de pontos anatômicos específicos através da inserção de agulhas filiformes estéreis para modulação do sistema nervoso periférico e central, atuando na analgesia e regulação homeostática."
| Complexidade: "MC - Média Complexidade"
| Registro: "01-BPA (Consolidado), 02-BPA (Individualizado), 05-AIH (Proc. Secundário)"
| Restrição Etária: "Idade Mínima: 0 Mes(es) | Idade Máxima: 130 Ano(s)"
| CIDs Vinculados: ["M545", "G439", "F411", "M791", "G442", "M255", "R529"]
| CBOs Autorizados: ["223293", "223415", "223505", "223605", "223905", "225103"]
valor: 4.13
---

---
classe_deficiencia: "Práticas Integrativas e Complementares (PICS)"
subclasse: "Acupuntura e Práticas Tradicionais Chinesas"
Código: "0309050030"
Nome: "SESSÃO DE ELETROACUPUNTURA / LASER ACUPUNTURA"
Descrição: "Modulação avançada de pontos reflexos utilizando correntes elétricas de baixa frequência acopladas às agulhas ou aplicação localizada de laser de baixa intensidade, otimizando o tempo de recuperação tecidual e analgesia."
| Complexidade: "MC - Média Complexidade"
| Registro: "01-BPA (Consolidado), 02-BPA (Individualizado), 05-AIH (Proc. Secundário)"
| Restrição Etária: "Idade Mínima: 0 Mes(es) | Idade Máxima: 130 Ano(s)"
| CIDs Vinculados: ["G500", "M544", "M541", "G629", "M792", "R522"]
| CBOs Autorizados: ["223293", "223505", "223605", "223905", "225103"]
valor: 0.77
---

---
classe_deficiencia: "Práticas Integrativas e Complementares (PICS)"
subclasse: "Acupuntura e Práticas Tradicionais Chinesas"
Código: "0309050049"
Nome: "SESSÃO DE AURICULOTERAPIA"
Descrição: "Estimulação dos pontos reguladores situados no pavilhão auricular através de agulhas micro, sementes ou esferas magnéticas, ativando reflexos somatotópicos para o equilíbrio biopsicossocial."
| Complexidade: "AB - Atenção Básica"
| Registro: "02 - BPA (Individualizado)"
| Restrição Etária: "Idade Mínima: 0 Mes(es) | Idade Máxima: 130 Ano(s)"
| CIDs Vinculados: ["F412", "F329", "I10", "E669", "Z730"]
| CBOs Autorizados: ["223293", "223505", "223605", "223905", "225103", "251510"]
valor: 0.00
---

# ==============================================================================
# CLASSE: SAÚDE BUCAL E MANEJO CLÍNICO PcD
# ==============================================================================

---
classe_deficiencia: "Saúde Bucal e Manejo Clinical PcD"
subclasse: "Manejo e Diagnóstico Odontológico Especializado"
Código: "0307010147"
Nome: "ADEQUAÇÃO DO COMPORTAMENTO DA PESSOA COM DEFICIÊNCIA EM ODONTOLOGIA"
Descrição: "Intervenção clínica focada no acolhimento, estabilização protetiva e técnicas de condicionamento psicológico para viabilizar a assistência odontológica segura a pacientes com alterações neuromotoras, cognitivas ou intelectuais em nível ambulatorial."
| Complexidade: "AB - Atenção Básica"
| Registro: "02 - BPA (Individualizado)"
| Restrição Etária: "Idade Mínima: 12 Mes(es) | Idade Máxima: 130 Ano(s)"
| CIDs Vinculados: ["G800", "G809", "F70", "F71", "F72", "F840", "Q059", "Q909"]
| CBOs Autorizados: ["223208", "223212", "223216", "223276", "223280"]
valor: 0.00
---

---
classe_deficiencia: "Saúde Bucal e Manejo Clinical PcD"
subclasse: "Manejo e Diagnóstico Odontológico Especializado"
Código: "0307010058"
Nome: "TRATAMENTO DE NEVRALGIAS FACIAIS"
Descrição: "Acompanhamento clínico continuado e regulação farmacológica protetiva de distúrbios álgicos complexos da face, com ênfase no monitoramento e controle da dor neuropática e neuralgia do trigêmeo."
| Complexidade: "MC - Média Complexidade"
| Registro: "01-BPA (Consolidado), 02-BPA (Individualizado)"
| Restrição Etária: "Idade Mínima: 0 Mes(es) | Idade Máxima: 130 Ano(s)"
| CIDs Vinculados: ["G500", "G501", "G508", "M255"]
| CBOs Autorizados: ["223208", "225124", "225151"]
valor: 10.82
---

# ==============================================================================
# FIM DO MANIFESTO DE INGESTÃO - PRONTO PARA DEPLOY VIA GITHUB ACTIONS
# ==============================================================================
