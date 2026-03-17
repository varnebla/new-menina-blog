export const TOPIC_DEFINITIONS = [
  {
    slug: 'arte',
    label: 'Arte',
    kicker: 'Lecturas visuales',
    description:
      'Secretos, símbolos y contexto para mirar las obras con más calma y con mejores preguntas.',
    seoDescription: 'Descubre secretos y curiosidades tras las obras de arte más famosas. Análisis detallado de pinturas, esculturas y movimientos artísticos con un lenguaje accesible para todos los públicos.'
  },
  {
    slug: 'disney',
    label: 'Disney',
    kicker: 'Referencias ocultas',
    description:
      'Curiosidades, iconografía y guiños culturales escondidos en las películas de animación.',
      seoDescription: 'Descubre las referencias artísticas y culturales escondidas en las películas de Disney. Análisis de obras de arte, arquitectura y elementos culturales que aparecen en las animaciones.'
  },
  {
    slug: 'viajes',
    label: 'Viajes',
    kicker: 'Geografías culturales',
    description:
      'Rutas, visitas y paisajes donde el viaje se cruza con la historia, el arte y la memoria.',
      seoDescription: 'Explora destinos culturales y experiencias de viaje únicas. Visitas a museos, monumentos históricos y lugares con valor artístico y cultural.'
  },
] as const;

export type TopicSlug = (typeof TOPIC_DEFINITIONS)[number]['slug'];

export function getTopicDefinition(topic: string) {
  const match = TOPIC_DEFINITIONS.find((item) => item.slug === topic);

  if (match) {
    return match;
  }

  return {
    slug: topic,
    label: topic.charAt(0).toUpperCase() + topic.slice(1),
    kicker: 'Archivo editorial',
    description: 'Explora una selección de artículos culturales y visuales.',
  };
}