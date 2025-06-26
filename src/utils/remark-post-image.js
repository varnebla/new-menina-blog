import { visit } from 'unist-util-visit';

export function remarkPostImage() {
  return function (tree) {
    visit(tree, 'image', (node) => {
      // Extraer información de la imagen
      const src = node.url;
      const alt = node.alt || '';
      const title = node.title || '';
      
      // Determinar la orientación basándose en el título o alt
      const orientation = title.includes('horizontal') || alt.includes('horizontal') 
        ? 'horizontal' 
        : 'vertical';
      
      // Usar el título como caption si existe, sino usar el alt
      const caption = title || alt;
      
      // Transformar el nodo de imagen en un nodo JSX que use PostImage
      node.type = 'mdxJsxFlowElement';
      node.name = 'PostImage';
      node.attributes = [
        {
          type: 'mdxJsxAttribute',
          name: 'src',
          value: src
        },
        {
          type: 'mdxJsxAttribute',
          name: 'alt',
          value: alt
        },
        {
          type: 'mdxJsxAttribute',
          name: 'orientation',
          value: orientation
        },
        {
          type: 'mdxJsxAttribute',
          name: 'caption',
          value: caption
        }
      ];
    });
  };
} 