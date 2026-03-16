export const TOPIC_DEFINITIONS = [
  {
    slug: 'arte',
    label: 'Arte',
    kicker: 'Lecturas visuales',
    description:
      'Secretos, símbolos y contexto para mirar las obras con más calma y con mejores preguntas.',
  },
  {
    slug: 'disney',
    label: 'Disney',
    kicker: 'Referencias ocultas',
    description:
      'Curiosidades, iconografía y guiños culturales escondidos en las películas de animación.',
  },
  {
    slug: 'viajes',
    label: 'Viajes',
    kicker: 'Geografías culturales',
    description:
      'Rutas, visitas y paisajes donde el viaje se cruza con la historia, el arte y la memoria.',
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