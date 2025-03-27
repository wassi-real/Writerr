# Writerr

Writerr is an open-source writing application that helps authors organize and write their books. Built with Svelte and SvelteKit, it provides a clean, distraction-free environment for writers to focus on their content.

## Features

- Create and manage books with title, author, and description
- Organize content with chapters and reorder them as needed
- Simple, distraction-free writing interface with Markdown support
- Local storage persistence for offline use
- Export chapters as text files or entire books as ZIP archives
- Responsive design that works on desktop and mobile devices
- Dark mode interface optimized for long writing sessions

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/writerr.git
cd writerr
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

## Usage

1. Create an account with a username and passcode (stored locally)
2. Create a new book with title, author, and description
3. Add chapters to your book
4. Click on a chapter to start writing in the distraction-free editor
5. Use the toolbar to format your text with Markdown
6. Your work is automatically saved to local storage
7. Export your chapters or entire book when finished

## Technologies Used

- [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/) - Frontend framework
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Showdown](https://github.com/showdownjs/showdown) - Markdown conversion
- [JSZip](https://stuk.github.io/jszip/) - Book export functionality
- [svelte-dnd-action](https://github.com/isaacHagoel/svelte-dnd-action) - Drag and drop for chapter reordering

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to all the open-source libraries that made this project possible
- Special thanks to the Svelte and SvelteKit communities for their excellent documentation

## Contact

If you have any questions or suggestions, please open an issue on GitHub.
