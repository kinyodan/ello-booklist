const images = import.meta.glob('./assets/*.{png,jpg,jpeg,svg,webp}', { eager: true });

export default images;