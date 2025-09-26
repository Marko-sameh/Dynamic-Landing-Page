# 🏗️ Dynamic Landing Page - Nizek Contracting

A professional, responsive Arabic landing page for a contracting company with dynamic content loading, interactive before/after image sliders, and integrated WhatsApp functionality.

## ✨ Features

### 🎯 Core Functionality
- **Dynamic Content Loading**: JSON-based content management system
- **Interactive Before/After Sliders**: Touch-enabled image comparison sliders
- **WhatsApp Integration**: Direct quote requests and appointment booking
- **Responsive Design**: Optimized for all devices (mobile-first approach)
- **RTL Support**: Full Arabic language support with proper text direction

### 📱 User Experience
- **Quote Request Form**: Comprehensive form with file upload preview
- **Appointment Booking**: Modal-based appointment scheduling
- **Social Media Integration**: Direct links to Instagram, Snapchat, TikTok
- **SEO Optimized**: Complete meta tags, structured data, and Open Graph
- **Analytics Ready**: TikTok Pixel and Snapchat Pixel integration

### 🎨 Design Features
- **Modern Dark Theme**: Professional dark background with gold accents
- **Smooth Animations**: CSS transitions and hover effects
- **Mobile-Optimized**: Touch-friendly interface with proper sizing
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Quick Start

1. **Clone or download** the project files
2. **Open** `index.html` in a web browser
3. **Customize** content by editing JSON files in the `content/` folder
4. **Replace** images with your own in the root directory

## 📁 Project Structure

```
dynamic-landing-page/
├── 📄 index.html              # Main HTML file
├── 📁 css/
│   └── style.css              # Responsive styles and theme
├── 📁 js/
│   └── dynamic-content.js     # Content loading and interactions
├── 📁 content/
│   ├── texts.json            # All text content (Arabic)
│   └── images.json           # Image paths and portfolio data
├── 🖼️ *.webp, *.png, *.jpg    # Image assets
└── 📋 README.md              # This file
```

## ⚙️ Configuration

### 📝 Content Management

Edit `content/texts.json` to customize:
- Company information and branding
- Service descriptions
- Customer testimonials
- Contact details and social media links
- WhatsApp number and messaging

### 🖼️ Image Management

Update `content/images.json` to change:
- Logo and hero images
- Portfolio before/after images
- About section visuals

### 🎨 Styling

Modify `css/style.css` for:
- Color scheme adjustments
- Typography changes
- Layout modifications
- Responsive breakpoints

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: No external dependencies
- **Bootstrap 5**: RTL-enabled responsive framework
- **Bootstrap Icons**: Comprehensive icon library

### Key Components

#### Dynamic Content Loader
```javascript
// Loads content from JSON files
async function loadContent() {
  const [texts, images] = await Promise.all([
    fetch("content/texts.json").then(res => res.json()),
    fetch("content/images.json").then(res => res.json())
  ]);
  // Populates DOM elements dynamically
}
```

#### Before/After Slider
- Touch and mouse drag support
- Responsive design with proper touch targets
- Smooth animations with CSS transforms
- Accessibility features for screen readers

#### WhatsApp Integration
- Dynamic message generation
- Form data integration
- Appointment booking system
- Multiple CTA buttons throughout the page

### Browser Support
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Optimization

### Performance Features
- **Lazy Loading**: Images load as needed
- **Optimized Assets**: WebP format for better compression
- **Minimal JavaScript**: Vanilla JS for faster loading
- **CSS Optimization**: Efficient selectors and minimal reflows

### Touch Experience
- **44px minimum touch targets**: Follows accessibility guidelines
- **Smooth scrolling**: Native smooth scroll behavior
- **Touch-friendly forms**: Proper input types and validation
- **Gesture support**: Swipe and drag interactions

## 🔧 Customization Guide

### Changing Colors
Update the CSS custom properties in `style.css`:
```css
:root {
  --primary-color: #d1a546;    /* Gold accent */
  --background-color: #181d27;  /* Dark background */
  --text-color: #fefefe;       /* Light text */
}
```

### Adding New Sections
1. Add HTML structure to `index.html`
2. Add content to `texts.json`
3. Update `dynamic-content.js` to populate the new section
4. Style the section in `style.css`

### WhatsApp Configuration
Update the WhatsApp number in `content/texts.json`:
```json
{
  "whatsappNumber": "+966549228052",
  "domain": "your-domain.com"
}
```

## 🚀 Deployment

### Static Hosting
This project works with any static hosting service:
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free hosting for public repos
- **Traditional hosting**: Upload via FTP/SFTP

### Performance Tips
1. **Optimize images**: Use WebP format when possible
2. **Enable compression**: Gzip/Brotli on server
3. **Use CDN**: For faster global delivery
4. **Cache headers**: Set appropriate cache policies

## 📊 Analytics & Tracking

### Included Tracking
- **TikTok Pixel**: Conversion tracking for TikTok ads
- **Snapchat Pixel**: Conversion tracking for Snapchat ads
- **Structured Data**: Rich snippets for search engines

### Adding Google Analytics
Add this code before the closing `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 Security Considerations

- **Form Validation**: Client and server-side validation recommended
- **File Uploads**: Preview only - implement secure server handling
- **External Links**: All social media links open in new tabs
- **Content Security**: Sanitize any user-generated content

## 🐛 Troubleshooting

### Common Issues

**Images not loading:**
- Check file paths in `images.json`
- Ensure image files exist in the root directory
- Verify file extensions match exactly

**Content not updating:**
- Clear browser cache
- Check browser console for JavaScript errors
- Validate JSON syntax in content files

**Mobile layout issues:**
- Test on actual devices, not just browser dev tools
- Check viewport meta tag is present
- Verify touch events are working properly

## 📈 Performance Metrics

### Lighthouse Scores (Target)
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95+

### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on multiple devices
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For questions or support:
- **Email**: nayzakest@gmail.com
- **WhatsApp**: +966549228052
- **Website**: neizak.sa

---

**Built for Nizek Contracting Foundation**

*Professional contracting services in Saudi Arabia - From concept to completion*
