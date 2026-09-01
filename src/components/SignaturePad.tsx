import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

interface Props {
  label: string;
  onChange: (firma: string) => void;
}

export default function SignaturePad({
  label,
  onChange,
}: Props) {

  const canvasRef = useRef<SignatureCanvas | null>(null);


  const limpiarFirma = () => {
    canvasRef.current?.clear();
    onChange("");
  };


  const guardarFirma = () => {

    if (canvasRef.current) {

      const canvas =
        canvasRef.current.getCanvas();

      const firma =
        canvas.toDataURL("image/png");


      onChange(firma);
    }

  };


  return (

    <div className="form-group">

      <label>
        {label} *
      </label>


      <div className="signature-container">

        <SignatureCanvas

          ref={canvasRef}

          penColor="black"

          canvasProps={{
            className:"signature-canvas"
          }}

          onEnd={guardarFirma}

        />

      </div>


      <button

        type="button"

        className="btn-clear-signature"

        onClick={limpiarFirma}

      >

        Limpiar firma

      </button>


    </div>

  );
}