import type { Language } from '../config/i18n';

export interface AcademyLesson {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  icon: string;
  content: string;
  keyRule: string;
}

const LESSONS_DB: Record<Language, AcademyLesson[]> = {
  es: [
    {
      id: 'lesson-1',
      title: '1. Martingala Clásica vs. Martingala Acotada con Stop-Loss',
      subtitle: 'Por qué la duplicación infinita arruina y cómo el enfoque acotado (3-4 pasos) protege el capital.',
      duration: '5 min lectura',
      icon: '🛡️',
      content: `
        La <strong>Martingala Tradicional</strong> (duplicar sin límite tras cada fallo) asume capital infinito y conduce a la ruina matemática por crecimiento exponencial:
        <br><br>
        • <strong>Intento 1:</strong> $20 | <strong>Intento 2:</strong> $40 | <strong>Intento 3:</strong> $80 | <strong>Intento 4:</strong> $160 | <strong>Intento 5:</strong> $320 | <strong>Intento 6:</strong> $640 (¡Más del 60% de una banca de $1,000 en 1 solo juego!).
        <br><br>
        <strong>El Enfoque Cuantitativo: Martingala Acotada (3 a 4 Pasos con Stop-Loss Estricto):</strong><br>
        Para aprovechar el potencial de recuperación de beneficios con riesgo matemáticamente acotado, el <strong>Stake Base</strong> se dimensiona hacia atrás desde el techo máximo anti-ruina (5%):
        <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 0.4rem; padding: 0.6rem; margin: 0.75rem 0; font-family: monospace; font-size: 0.82rem; color: #38bdf8; text-align: center; font-weight: 700;">
          Stake Base = (Bankroll × MaxStakePct) / 2^(MaxPasos - 1)
        </div>
        • <strong>Paso 1:</strong> $6.25 (0.625% de $1,000)<br>
        • <strong>Paso 2:</strong> $12.50 (1.250%)<br>
        • <strong>Paso 3:</strong> $25.00 (2.500%)<br>
        • <strong>Paso 4 (Tope):</strong> $50.00 (5.00% exacto = Límite Anti-Ruina)<br>
        • <strong>🛑 Evento de Stop-Loss:</strong> Si el 4º intento no acierta, <em>se corta la secuencia de forma estricta</em>, se asume la pérdida acotada (&lt;9.4% total del bankroll) y se reinicia el ciclo al Stake Base sin duplicar jamás.
      `,
      keyRule: '🛡️ Regla Anti-Ruina #1: Jamás operes Martingala infinita. Si aplicas progresión, acótala estrictamente a 3-4 pasos con Stop-Loss obligatorio y stake tope del 5%.'
    },
    {
      id: 'lesson-2',
      title: '2. Dimensionamiento Óptimo de Posición (Stakes 1-2%)',
      subtitle: 'Cómo protegerse contra rachas adversas sin comprometer el crecimiento.',
      duration: '5 min lectura',
      icon: '⚖️',
      content: `
        El Criterio Kelly Fraccional y los modelos de preservación institucional demuestran que un stake de entre el <strong>1% y el 2%</strong> es el punto dulce matemático:
        <br><br>
        • Con un stake del 2%, necesitas <strong>50 fallos consecutivos</strong> para agotar tu banca (probabilidad casi nula).<br>
        • Permite tolerar drawdowns temporales con total tranquilidad emocional.<br>
        • El crecimiento compuesto a 12 meses supera con creces cualquier intento agresivo de corto plazo.
      `,
      keyRule: '📊 Regla Anti-Ruina #2: Opera con perfiles conservadores (1-2%) para asegurar supervivencia indefinida.'
    },
    {
      id: 'lesson-3',
      title: '3. Estrategia Paroli (Anti-Martingala Progresiva Positiva)',
      subtitle: 'Aprovechar rachas ganadoras arriesgando las ganancias del mercado, no tu capital.',
      duration: '5 min lectura',
      icon: '🚀',
      content: `
        El <strong>Sistema Paroli</strong> es exactamente lo opuesto a la destructiva Martingala. Su principio consiste en <strong>doblar únicamente tras un acierto</strong> y reiniciar tras 3 victorias consecutivas o tras un fallo:
        <br><br>
        • <strong>Paso 1:</strong> Apuestas tu unidad base del 2% ($20). Si ganas (a cuota 2.00), tienes $40.<br>
        • <strong>Paso 2:</strong> Re-inviertes los $40 (arriesgando solo la ganancia obtenida). Si ganas, tienes $80.<br>
        • <strong>Paso 3:</strong> Inviertes $80. Si ganas, obtienes $160 de retorno neto.<br>
        • <strong>Cierre de Ciclo:</strong> Aseguras los <strong>$140 de beneficio limpio</strong> y <strong>vuelves a la unidad base inicial de $20</strong>.
        <br><br>
        <strong>Ventaja Matemática:</strong> En caso de fallo en cualquier momento, <em>tu pérdida máxima real de capital propio siempre fue únicamente la unidad base de $20</em>.
      `,
      keyRule: '⚡ Regla Paroli: Fija siempre un techo estricto de 3 aciertos consecutivos antes de asegurar ganancias y reiniciar el ciclo.'
    },
    {
      id: 'lesson-4',
      title: '4. Valor Esperado Positivo (+EV) y Reversión a la Media',
      subtitle: 'Enfocarse en probabilidades estadísticas y no en adivinación.',
      duration: '6 min lectura',
      icon: '📈',
      content: `
        Una racha estadística madura (por ejemplo, 18 partidos sin empate en una liga donde históricamente el 28% de los juegos empatan) genera una <strong>asimetría favorable</strong>:
        <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 0.4rem; padding: 0.6rem; margin: 0.75rem 0; font-family: monospace; font-size: 0.82rem; color: #38bdf8; text-align: center; font-weight: 700;">
          EV = (Probabilidad Real × Ganancia) - (Probabilidad Fallo × Pérdida)
        </div>
        Cuando el valor esperado es positivo (<strong>+EV</strong>), el tiempo y la ley de los grandes números juegan siempre a tu favor.
      `,
      keyRule: '🎯 Regla Anti-Ruina #3: Solo opera cuando la madurez de la racha justifique una señal de oportunidad Verde o Azul.'
    },
    {
      id: 'lesson-5',
      title: '5. La Regla de Oro del Stop-Bank y Control de Drawdown',
      subtitle: 'El seguro de vida de tu capital operativo.',
      duration: '4 min lectura',
      icon: '🛑',
      content: `
        Todo plan institucional establece un <strong>Stop-Bank</strong> (nivel de capital de seguridad). Si tu capital inicial es de $1,000 y fijas tu Stop-Bank en $700:
        <br><br>
        • Si la banca desciende a $700, la operativa se pausa de forma obligatoria.<br>
        • Se auditan las operaciones para descartar sobre-operación o fallos emocionales.<br>
        • Protege el 70% de tu capital para que nunca sufras una pérdida total.
      `,
      keyRule: '🔒 Regla Anti-Ruina #4: Jamás vulneres el límite de Stop-Bank ni los límites de pérdida diarios.'
    }
  ],
  en: [
    {
      id: 'lesson-1',
      title: '1. Classic Martingale vs. Bounded Martingale with Hard Stop-Loss',
      subtitle: 'Why infinite doubling fails and how the bounded method (3-4 steps) shields your capital.',
      duration: '5 min read',
      icon: '🛡️',
      content: `
        <strong>Traditional Martingale</strong> (unlimited doubling after every loss) assumes infinite bankroll and leads to mathematical ruin due to exponential scaling:
        <br><br>
        • <strong>Attempt 1:</strong> $20 | <strong>Attempt 2:</strong> $40 | <strong>Attempt 3:</strong> $80 | <strong>Attempt 4:</strong> $160 | <strong>Attempt 5:</strong> $320 | <strong>Attempt 6:</strong> $640 (Over 60% of a $1,000 bankroll on a single game!).
        <br><br>
        <strong>Quantitative Framework: Bounded Martingale (3-4 Steps with Hard Stop-Loss):</strong><br>
        To harness recovery potential while capping catastrophic drawdown, the <strong>Base Stake</strong> is calculated backwards from the anti-ruin ceiling (5% max):
        <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 0.4rem; padding: 0.6rem; margin: 0.75rem 0; font-family: monospace; font-size: 0.82rem; color: #38bdf8; text-align: center; font-weight: 700;">
          Base Stake = (Bankroll × MaxStakePct) / 2^(MaxSteps - 1)
        </div>
        • <strong>Step 1:</strong> $6.25 (0.625% of $1,000)<br>
        • <strong>Step 2:</strong> $12.50 (1.250%)<br>
        • <strong>Step 3:</strong> $25.00 (2.500%)<br>
        • <strong>Step 4 (Ceiling):</strong> $50.00 (5.00% exact = Anti-Ruin Cap)<br>
        • <strong>🛑 Stop-Loss Event:</strong> If Step 4 fails, <em>the sequence immediately cuts</em>, accepts the bounded loss (&lt;9.4% total bankroll), and resets to the Base Stake without ever doubling further.
      `,
      keyRule: '🛡️ Anti-Ruin Rule #1: Never run infinite Martingale. If using progression, strictly bound it to 3-4 steps with mandatory Stop-Loss and 5% stake ceiling.'
    },
    {
      id: 'lesson-2',
      title: '2. Optimal Position Sizing (Stakes 1-2%)',
      subtitle: 'How to protect yourself from bad streaks without sacrificing growth.',
      duration: '5 min read',
      icon: '⚖️',
      content: `
        Fractional Kelly and institutional risk models prove that a stake between <strong>1% and 2%</strong> is the mathematical sweet spot:
        <br><br>
        • With a 2% stake, you need <strong>50 consecutive losses</strong> to deplete your bankroll (virtually impossible).<br>
        • Allows you to absorb short-term drawdowns with zero emotional stress.<br>
        • Compound growth over 12 months vastly outperforms aggressive short-term gambling.
      `,
      keyRule: '📊 Anti-Ruin Rule #2: Operate with conservative profiles (1-2%) to guarantee indefinite survival.'
    },
    {
      id: 'lesson-3',
      title: '3. Paroli Strategy (Positive Progressive Anti-Martingale)',
      subtitle: 'Ride winning streaks by risking the market\'s profit, not your own capital.',
      duration: '5 min read',
      icon: '🚀',
      content: `
        The <strong>Paroli System</strong> is the exact opposite of the destructive Martingale. Its core principle is to <strong>double only after a win</strong> and reset after 3 consecutive wins or after any loss:
        <br><br>
        • <strong>Step 1:</strong> Bet your 2% base unit ($20). Win at 2.00 odds gives $40.<br>
        • <strong>Step 2:</strong> Re-invest the $40 (risking only previous profits). Win gives $80.<br>
        • <strong>Step 3:</strong> Invest $80. Win yields $160 total return.<br>
        • <strong>Cycle Complete:</strong> Lock in <strong>$140 net profit</strong> and <strong>return to the $20 base unit</strong>.
        <br><br>
        <strong>Mathematical Edge:</strong> In case of a loss at any stage, <em>your real loss from your own capital was only the initial $20 base unit</em>.
      `,
      keyRule: '⚡ Paroli Rule: Always set a strict ceiling of 3 consecutive wins before locking profit and restarting.'
    },
    {
      id: 'lesson-4',
      title: '4. Positive Expected Value (+EV) & Mean Reversion',
      subtitle: 'Focus on statistical probability rather than guesswork.',
      duration: '6 min read',
      icon: '📈',
      content: `
        A mature statistical streak (e.g. 18 matches without a draw in a league where historically 28% of games end in draws) creates a <strong>favorable edge</strong>:
        <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 0.4rem; padding: 0.6rem; margin: 0.75rem 0; font-family: monospace; font-size: 0.82rem; color: #38bdf8; text-align: center; font-weight: 700;">
          EV = (True Probability × Profit) - (Loss Probability × Stake)
        </div>
        When expected value is positive (<strong>+EV</strong>), time and the law of large numbers always work in your favor.
      `,
      keyRule: '🎯 Anti-Ruin Rule #3: Only trade when streak maturity triggers a validated Green or Blue signal.'
    },
    {
      id: 'lesson-5',
      title: '5. The Golden Rule of Stop-Bank & Drawdown Control',
      subtitle: 'The life insurance of your trading capital.',
      duration: '4 min read',
      icon: '🛑',
      content: `
        Every institutional fund defines a strict <strong>Stop-Bank</strong> (capital safety floor). If your starting bankroll is $1,000 and you set your Stop-Bank at $700:
        <br><br>
        • If the balance drops to $700, all trading is paused automatically.<br>
        • Operations are audited to diagnose over-trading or emotional discipline failures.<br>
        • Protects 70% of your bankroll so you never suffer total capital loss.
      `,
      keyRule: '🔒 Anti-Ruin Rule #4: Never breach the Stop-Bank threshold or daily loss limits.'
    }
  ],
  pt: [
    {
      id: 'lesson-1',
      title: '1. Martingale Clássico vs. Martingale Limitado com Stop-Loss',
      subtitle: 'Por que a duplicação infinita quebra e como o método limitado (3-4 passos) protege o capital.',
      duration: '5 min leitura',
      icon: '🛡️',
      content: `
        O <strong>Martingale Tradicional</strong> (dobrar sem limite após cada erro) pressupõe capital infinito e conduz à ruína matemática pelo crescimento exponencial:
        <br><br>
        • <strong>Tentativa 1:</strong> $20 | <strong>Tentativa 2:</strong> $40 | <strong>Tentativa 3:</strong> $80 | <strong>Tentativa 4:</strong> $160 | <strong>Tentativa 5:</strong> $320 | <strong>Tentativa 6:</strong> $640 (Mais de 60% de uma banca de $1,000 em 1 único jogo!).
        <br><br>
        <strong>Abordagem Quantitativa: Martingale Limitado (3 a 4 Passos com Stop-Loss Estrito):</strong><br>
        Para capturar benefícios de recuperação com risco matematicamente controlado, o <strong>Stake Base</strong> é dimensionado a partir do teto de segurança (5% máx):
        <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 0.4rem; padding: 0.6rem; margin: 0.75rem 0; font-family: monospace; font-size: 0.82rem; color: #38bdf8; text-align: center; font-weight: 700;">
          Stake Base = (Bankroll × MaxStakePct) / 2^(MaxPassos - 1)
        </div>
        • <strong>Passo 1:</strong> $6.25 (0.625% de $1,000)<br>
        • <strong>Passo 2:</strong> $12.50 (1.250%)<br>
        • <strong>Passo 3:</strong> $25.00 (2.500%)<br>
        • <strong>Passo 4 (Teto):</strong> $50.00 (5.00% exato = Limite Anti-Ruína)<br>
        • <strong>🛑 Evento de Stop-Loss:</strong> Se o 4º passo falhar, <em>a sequência é cortada imediatamente</em>, assume-se a perda limitada (&lt;9.4% total) e reinicia-se o ciclo ao Stake Base sem dobrar mais.
      `,
      keyRule: '🛡️ Regra Anti-Ruína #1: Nunca opere Martingale infinito. Se usar progressão, limite estritamente a 3-4 passos com Stop-Loss obrigatório e teto de 5%.'
    },
    {
      id: 'lesson-2',
      title: '2. Dimensionamento Ideal de Posição (Stakes 1-2%)',
      subtitle: 'Como se proteger contra sequências ruins sem comprometer o crescimento.',
      duration: '5 min leitura',
      icon: '⚖️',
      content: `
        O Critério Kelly Fracionário e os modelos de gestão institucional comprovam que um stake entre <strong>1% e 2%</strong> é o ponto ideal matemático:
        <br><br>
        • Com stake de 2%, você precisa de <strong>50 erros consecutivos</strong> para zerar a banca (probabilidade quase nula).<br>
        • Permite absorver drawdowns temporários com total calma emocional.<br>
        • O crescimento composto em 12 meses supera de longe qualquer tentativa agressiva de curto prazo.
      `,
      keyRule: '📊 Regra Anti-Ruína #2: Opere com perfis conservadores (1-2%) para assegurar sobrevivência indefinida.'
    },
    {
      id: 'lesson-3',
      title: '3. Estratégia Paroli (Anti-Martingale Progressivo Positivo)',
      subtitle: 'Aproveite sequências vencedoras arriscando o lucro do mercado, não seu capital.',
      duration: '5 min leitura',
      icon: '🚀',
      content: `
        O <strong>Sistema Paroli</strong> é o oposto do destrutivo Martingale. Seu princípio consiste em <strong>dobrar unicamente após um acerto</strong> e reiniciar após 3 vitórias consecutivas ou uma perda:
        <br><br>
        • <strong>Passo 1:</strong> Aposta a unidade base de 2% ($20). Vitória na odd 2.00 dá $40.<br>
        • <strong>Passo 2:</strong> Re-investe os $40 (arriscando só o lucro obtido). Vitória dá $80.<br>
        • <strong>Passo 3:</strong> Investe $80. Vitória rende $160 de retorno líquido.<br>
        • <strong>Fechamento do Ciclo:</strong> Garante <strong>$140 de lucro limpo</strong> e <strong>retorna à unidade base inicial de $20</strong>.
        <br><br>
        <strong>Vantagem Matemática:</strong> Em caso de erro em qualquer fase, <em>sua perda real de capital próprio foi apenas a unidade base de $20</em>.
      `,
      keyRule: '⚡ Regra Paroli: Defina sempre um teto estrito de 3 acertos seguidos antes de garantir lucros e reiniciar o ciclo.'
    },
    {
      id: 'lesson-4',
      title: '4. Valor Esperado Positivo (+EV) e Reversión à Média',
      subtitle: 'Focar em probabilidades estatísticas e não em adivinhação.',
      duration: '6 min leitura',
      icon: '📈',
      content: `
        Uma sequência estatística madura (ex.: 18 jogos sem empate numa liga onde historicamente 28% dos jogos empatam) gera uma <strong>assimetria favorável</strong>:
        <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 0.4rem; padding: 0.6rem; margin: 0.75rem 0; font-family: monospace; font-size: 0.82rem; color: #38bdf8; text-align: center; font-weight: 700;">
          EV = (Probabilidade Real × Lucro) - (Probabilidade Erro × Perda)
        </div>
        Quando o valor esperado é positivo (<strong>+EV</strong>), o tempo e a lei dos grandes números jogam a seu favor.
      `,
      keyRule: '🎯 Regra Anti-Ruína #3: Apenas opere quando a maturidade da sequência disparar um sinal Verde ou Azul.'
    },
    {
      id: 'lesson-5',
      title: '5. A Regra de Ouro do Stop-Bank e Controle de Drawdown',
      subtitle: 'O seguro de vida do seu capital operacional.',
      duration: '4 min leitura',
      icon: '🛑',
      content: `
        Todo plano institucional estabelece um <strong>Stop-Bank</strong> (piso de segurança). Se o seu capital inicial for $1,000 e fixar o Stop-Bank em $700:
        <br><br>
        • Se a banca cair para $700, as operações pausam obrigatoriamente.<br>
        • Auditam-se as operações para descartar excesso de entradas ou falhas emocionais.<br>
        • Protege 70% do seu capital para nunca sofrer quebra total.
      `,
      keyRule: '🔒 Regra Anti-Ruína #4: Nunca viole o limite de Stop-Bank nem os limites diários de perda.'
    }
  ],
  gn: [
    {
      id: 'lesson-1',
      title: '1. Martingala Clásica vs. Martingala Acotada Stop-Loss Reheve',
      subtitle: 'Mba\'érepa pe duplicación infinita ohundi ha mba\'éichapa pe enfoque acotado (3-4 pasos) oñangareko capital rehe.',
      duration: '5 min moñe\'ẽ',
      icon: '🛡️',
      content: `
        Pe <strong>Martingala Tradicional</strong> (emomokõivo límite\'ỹre reperde jave) oimo'ã pirapire ndopaiha ha ogueraha ruina matemática-pe exponencialmente:
        <br><br>
        • <strong>Ñeha'ã 1:</strong> $20 | <strong>Ñeha'ã 2:</strong> $40 | <strong>Ñeha'ã 3:</strong> $80 | <strong>Ñeha'ã 4:</strong> $160 | <strong>Ñeha'ã 5:</strong> $320 | <strong>Ñeha'ã 6:</strong> $640 (¡60% rasa peteĩ banca $1,000-gui peteĩ partido añóme!).
        <br><br>
        <strong>Enfoque Cuantitativo: Martingala Acotada (3 térã 4 Pasos Stop-Loss Estricto reheve):</strong><br>
        Jaipuru haguã beneficio recuperacion-gui ruina riesgo\'ỹre, pe <strong>Stake Base</strong> oñemombyky pe techo anti-ruina (5% max)-gui:
        <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 0.4rem; padding: 0.6rem; margin: 0.75rem 0; font-family: monospace; font-size: 0.82rem; color: #38bdf8; text-align: center; font-weight: 700;">
          Stake Base = (Bankroll × MaxStakePct) / 2^(MaxPasos - 1)
        </div>
        • <strong>Paso 1:</strong> $6.25 (0.625% $1,000-gui)<br>
        • <strong>Paso 2:</strong> $12.50 (1.250%)<br>
        • <strong>Paso 3:</strong> $25.00 (2.500%)<br>
        • <strong>Paso 4 (Techo):</strong> $50.00 (5.00% exacto = Límite Anti-Ruina)<br>
        • <strong>🛑 Stop-Loss Disparo:</strong> 4º intento ofalla ramo, <em>oñekytĩ secuencia pya'ete</em>, oje'asumi pérdida acotada (&lt;9.4% total) ha oñepyrũ jey Stake Base-pe emomokõi jey\'ỹre.
      `,
      keyRule: '🛡️ Regla Anti-Ruina #1: Araka\'eve ani eipuru Martingala infinita. Epurúramo progresión, emohenda 3-4 pasos-pe Stop-Loss obligatorio ha stake 5% tope reheve.'
    },
    {
      id: 'lesson-2',
      title: '2. Mba\'éichapa Ñamohenda Porãta Posición (Stakes 1-2%)',
      subtitle: 'Mba\'éichapa ñañeñangareko racha vai rehe ñamokangy\'ỹre ñande crecimiento.',
      duration: '5 min moñe\'ẽ',
      icon: '⚖️',
      content: `
        Criterio Kelly Fraccional ha modelos institucionales ohechauka stake <strong>1% ha 2%</strong> mbytépe ha'eha pe punto dulce matemático:
        <br><br>
        • Stake 2%-pe, reikotevẽ <strong>50 pérdidas consecutivas</strong> embopa haguã nde banca (hasyeterei oiko haguã).<br>
        • Oheja rembohasa drawdowns py'aguapy reheve.<br>
        • Crecimiento compuesto 12 jasy pukukue ombotuicha pya'eve oimeraẽva intento agresivo-gui.
      `,
      keyRule: '📊 Regla Anti-Ruina #2: Eipuru perfiles conservadores (1-2%) eñangareko haguã nde banca rehe tapiaite.'
    },
    {
      id: 'lesson-3',
      title: '3. Estrategia Paroli (Anti-Martingala Progresiva Positiva)',
      subtitle: 'Jaipuru racha ganadora ja\'arriesgávo mercado ganancias, ndaha\'éi ñande capital.',
      duration: '5 min moñe\'ẽ',
      icon: '🚀',
      content: `
        Pe <strong>Sistema Paroli</strong> ha'e pe opuesto Martingala-gui. Iprincipio ha'e <strong>emomokõi regana rire añoite</strong> ha eñepyrũ jey 3 victorias seguidas rire térã reperde jave:
        <br><br>
        • <strong>Paso 1:</strong> Emoĩ unidad base 2% ($20). Reganávo (cuota 2.00-pe), reiko $40 reheve.<br>
        • <strong>Paso 2:</strong> Re-inverte $40 (re\'arriesga ganancia añoite). Reganávo, reiko $80 reheve.<br>
        • <strong>Paso 3:</strong> Remoĩ $80. Reganávo, rehupyty $160 beneficio neto.<br>
        • <strong>Ciclo Paha:</strong> Eñongatu <strong>$140 beneficio limpio</strong> ha <strong>ejevy pe unidad base $20-pe</strong>.
        <br><br>
        <strong>Matemática Ventaja:</strong> Reperde ramo oimeraẽva momento-pe, <em>nde pérdida añetegua ha'e pe $20 inicial añoite</em>.
      `,
      keyRule: '⚡ Regla Paroli: Emoĩ techo estricto 3 aciertos seguidos-pe eñongatu haguã ganancia ha eñepyrũ jey.'
    },
    {
      id: 'lesson-4',
      title: '4. Valor Esperado Positivo (+EV) ha Reversión a la Media',
      subtitle: 'Ñama\'ẽ probabilidades estadísticas rehe ha ndaha\'éi adivinación rehe.',
      duration: '6 min moñe\'ẽ',
      icon: '📈',
      content: `
        Peteĩ racha estadística hi'ajuetéva (techapyrã: 18 partidos empate\'ỹre peteĩ liga históricamente 28% empatávape) omoheñói <strong>asimetría favorable</strong>:
        <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 0.4rem; padding: 0.6rem; margin: 0.75rem 0; font-family: monospace; font-size: 0.82rem; color: #38bdf8; text-align: center; font-weight: 700;">
          EV = (Probabilidad Añetegua × Ganancia) - (Probabilidad Pérdida × Pérdida)
        </div>
        Valor esperado ha'e jave positivo (<strong>+EV</strong>), ára ha ley de grandes números oĩ tapiaite nde ykére.
      `,
      keyRule: '🎯 Regla Anti-Ruina #3: Eikéke operávo racha hi\'ajumatei jave señal Hovyũ térã Hovy-pe.'
    },
    {
      id: 'lesson-5',
      title: '5. Stop-Bank ha Drawdown Ñangareko Regla de Oro',
      subtitle: 'Nde capital operativo seguro de vida añetegua.',
      duration: '4 min moñe\'ẽ',
      icon: '🛑',
      content: `
        Opaite plan institucional omohenda <strong>Stop-Bank</strong> (capital de seguridad límite). Nde banca inicial ha'e ramo $1,000 ha emoĩ Stop-Bank $700-pe:
        <br><br>
        • Banca og̃uejy ramo $700-pe, operaciones opausa de forma obligatoria.<br>
        • Oñeaudita operaciones ojehecha haguã aníke oĩ sobre-operación térã fallo emocional.<br>
        • Oñangareko 70% nde capital rehe ani haguã araka'eve ndepy'aite'ỹre reperdepa.
      `,
      keyRule: '🔒 Regla Anti-Ruina #4: Araka\'eve ani embovai Stop-Bank límite ni pérdidas diarias límitere.'
    }
  ]
};

export function getAcademyLessons(lang: Language = 'es'): AcademyLesson[] {
  return LESSONS_DB[lang] || LESSONS_DB.es;
}

export const ACADEMY_LESSONS: AcademyLesson[] = LESSONS_DB.es;
