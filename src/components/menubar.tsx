import { Button } from "./ui/button";
import { Editor } from "@tiptap/react";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("Enter the URL of the image:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt("Enter the URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-2 mb-4 flex flex-wrap gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-gray-200" : ""}
      >
        bold
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-gray-200" : ""}
      >
        italic
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "bg-gray-200" : ""}
      >
        underline
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""}
      >
        left
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""
        }
      >
        center
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""}
      >
        right
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
      >
        bullet list
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
      >
        ordered list
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={addImage}>
        image
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={setLink}
        className={editor.isActive("link") ? "bg-gray-200" : ""}
      >
        link
      </Button>
      <input
        type="color"
        onInput={(event) => {
          editor
            .chain()
            .focus()
            .setColor((event.target as HTMLInputElement).value)
            .run();
        }}
        value={editor.getAttributes("textStyle").color}
        className="w-8 h-8 p-0 border-0"
      />
    </div>
  );
};

export default MenuBar;