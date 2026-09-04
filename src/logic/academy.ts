export interface AcademyLesson {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  icon: string;
  content: string;
  keyRule: string;
}

export const ACADEMY_LESSONS: AcademyLesson[] = [
  {
    id: 'lesson-1',
    title: '1. Por qué la Martingala Destruye Cualquier Banca',
    subtitle: 'La falacia matemática que arruina al 98% de los operadores.',
    duration: '4 min lectura',
    icon: '💣',
    content: `
      La estrategia de duplicar tras perder (Martingala) asume capital infinito. En los mercados reales, las rachas adversas existen y crecen de forma exponencial:
      <br><br>
      • <strong>Intento 1:</strong> $20<br>
      • <strong>Intento 2:</strong> $40<br>
      • <strong>Intento 3:</strong> $80<br>
      • <strong>Intento 4:</strong> $160<br>
      • <strong>Intento 5:</strong> $320<br>
      • <strong>Intento 6:</strong> $640 (¡Más del 60% de una banca de $1,000 en 1 solo juego!)
      <br><br>
      <strong>Nuestra Regla:</strong> Nunca doblar tras pérdida. El dimensionamiento matemático siempre se basa en un porcentaje plano del capital disponible actual.
    `,
    keyRule: '🛡️ Regla Anti-Ruina #1: El stake máximo jamás debe superar el 5% de tu capital disponible.'
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
];
