import axios from "axios";

const HandleDownload = () => {
    const downloadFile = () =>{
        const link = document.createElement("a");
    link.target = "_blank";
    link.download = "YOUR_FILE_NAME"
    
    const byteCharacters = atob("iVBORw0KGgoAAAANSUhEUgAAAhMAAAITCAMAAACKfW4WAAACN1BMVEW9vb98fH0AAABRUVIlJSYiIiMAAABHcEyamp2Dg4QAAAAAAABcXF+urrA/P0AAAAAAAAAAAAA6OjtpaWoAAACfn6CRkZIAAAAAAABcXF5GRkd2dncICAkAAAAAAAAbGxwAAAAwMDESEhMdHR4KCgsmJiYAAAAAAAATExQKCgoLCwsdHR4KCgooKCkUFBUJCQoTExMLCwwMDAwJCQoMDA0YGBkWFhYzMzQiIiMrKyw/P0AwMTJLS0wWFhccHBwNDQ8fHyAPDxAJCQkVFRUfHyExMTEXFxdSUlM7OzsNDQ12dnjj5OX///+SlJcAAABoaWvDw8QhIiJ9f4FSU1Vtb3EkJSU0NDSqq6s6OzzU1dY6OjpJSks4OTlxcnI/Pz9bW1yAgYGioqPb29u/v7+2traIio1mZmYODg64ubpVVVUqKiqQkJA2NzjGx8h/f3+Njo8cHBx2eHp/gYRbXF5GR0ecnJ0JCQnv7+9SU1TPz88SEhKfn585OTpjY2R/gIBfX18tLi8PDw8/QEJkZWcbGxwfHx/f398vLy+Pj49vb29ycnNPT0+rq6yvr6/AwMBub3FWVlaAgIBJSkyOj5DV1te5uro");
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    link.href = URL.createObjectURL(
        new Blob(byteArrays, { type: "image/jpeg" })
    );
    link.click();
    }

    return (
        <>
            <button type="submit" onClick={downloadFile}>Pobierz</button>
        </>
    )

  };

export default HandleDownload;