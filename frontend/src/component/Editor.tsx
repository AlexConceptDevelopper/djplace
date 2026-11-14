// src/component/Editor.tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { Highlight } from '@tiptap/extension-highlight';
import { useEffect } from 'react';

interface EditorProps {
  onChange: (html: string) => void;
  initialContent?: string;
}

export default function Editor({ onChange, initialContent = "" }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4 text-slate-100',
      },
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden focus-within:border-amber-500/50 transition-colors shadow-xl">
      {/* Barre d'outils (H2/H3 pour structurer le contenu, le H1 étant le titre principal de l'article) */}
      <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 border-b border-slate-800 p-3 text-xs">
        
        {/* Sous-titres (H2 / H3) */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2.5 py-1.5 rounded-lg font-bold transition ${editor.isActive('heading', { level: 2 }) ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2.5 py-1.5 rounded-lg font-bold transition ${editor.isActive('heading', { level: 3 }) ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          H3
        </button>

        <span className="w-px h-5 bg-slate-700 mx-1"></span>

        {/* Formatage de texte */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2.5 py-1.5 rounded-lg font-bold transition ${editor.isActive('bold') ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Gras
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2.5 py-1.5 rounded-lg font-bold transition ${editor.isActive('italic') ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Italique
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2.5 py-1.5 rounded-lg font-bold transition ${editor.isActive('strike') ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Barré
        </button>

        <span className="w-px h-5 bg-slate-700 mx-1"></span>

        {/* Couleur du texte */}
        <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg">
          <span className="text-[10px] text-slate-400">Couleur :</span>
          <input
            type="color"
            onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
            value={editor.getAttributes('textStyle').color || '#ffffff'}
            className="w-5 h-5 rounded border-0 bg-transparent cursor-pointer"
          />
        </div>

        {/* Surlignage */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`px-2.5 py-1.5 rounded-lg font-bold transition ${editor.isActive('highlight') ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Surligner 🖍️
        </button>

        <span className="w-px h-5 bg-slate-700 mx-1"></span>

        {/* Alignement */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`px-2.5 py-1.5 rounded-lg font-bold transition ${editor.isActive({ textAlign: 'left' }) ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Gauche
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`px-2.5 py-1.5 rounded-lg font-bold transition ${editor.isActive({ textAlign: 'center' }) ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Centrer
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`px-2.5 py-1.5 rounded-lg font-bold transition ${editor.isActive({ textAlign: 'right' }) ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Droite
        </button>

        <span className="w-px h-5 bg-slate-700 mx-1"></span>

        {/* Listes */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2.5 py-1.5 rounded-lg font-bold transition ${editor.isActive('bulletList') ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Liste •
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2.5 py-1.5 rounded-lg font-bold transition ${editor.isActive('orderedList') ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Liste 1.
        </button>

        <span className="w-px h-5 bg-slate-700 mx-1"></span>

        {/* Image */}
        <button
          type="button"
          onClick={() => {
            const url = prompt('URL de l’image :');
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className="px-2.5 py-1.5 rounded-lg font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
        >
          🖼️ Image
        </button>

      </div>

      {/* Zone de saisie */}
      <EditorContent editor={editor} />
    </div>
  );
}