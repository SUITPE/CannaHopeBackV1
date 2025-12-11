"use strict";

const moment = require("moment-timezone");
const environments = require("../../environments/varEnvironments");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

async function generateMedicalRecipe(consultationData, medicalTreatament, type) {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      //const headerImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...'; // Imagen base64 para el encabezado
      const headerImage =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAy4AAAHWCAYAAABp35vxAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDExLjUtYz0xNDcgNzkuMTYzNDk5LCAyMDIwLzA2LzEwLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1JlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmFhNDU0NzUzLTNlMWMtOWI0Yi04NzBmLTVhYTg3ZGYxNjQ5MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDphYTQ1NDc1My0zZTFjLTliNGItODcwZi01YWE4N2RmMTY0OTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphYTQ1NDc1My0zZTFjLTliNGItODcwZi01YWE4N2RmMTY0OTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YWE0NTQ3NTMtM2UxYy05YjRiLTg3MGYtNWFhODdkZjE2NDkzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+gUvFKgAAcRpJREFUeNrsnQeYJEX6x1e64Y/e4JVtD7Z9EB9BNcEWPvQgiUqApCGiDoUQUGircTfjWfYda+8E3S+QwYjIoeL1iiK/LaBpAkAQCy7KrA6qp/vHtm5nd2dnZ2ZndnZmZ2dn+8z83td1dd7szO7szu7M+d/JnV11zt7O7szC+Ujqvk+TBfUe9lXd3L4LOK8Ph5uQnp8OTab7ClpxPb+zcirSfUIK7zJ9P7JtDdSf2HWhd1Ke2vTXeK2LOGnF3pVa+U6b6u67udOdNOlpZzLFPud2WUX1X9dYvqvqs9zkmX3af+/2qHC+VgBmALgB4Aaw1h0yEmMt1O8aHUvtd1GwLq/6KqXG11X9VXV46l9tV1Gfad1pHc8uQFriends+...'; // recortado para brevedad

      const pdfPath = getPdfPath(consultationData);
      const writeStream = fs.createWriteStream(pdfPath);
      doc.pipe(writeStream);

      // Función para agregar encabezado
      function addHeader() {
        doc
          .image(headerImage, 390, 30, { width: 150 })
          .fontSize(16)
          .text("CONSULTORIO MÉDICO CANNAHOPE", 50, 60)
          .fontSize(13)
          .text("Ferreyros 291 - San Isidro", 50, 90)
          .text("contacto@centrocannahope.com", 50, 105)
          .text("+51 954 761 773", 50, 120)
          .moveDown();

        const currentDate = moment().tz("America/Lima").format("DD/MM/YYYY");
        doc.fontSize(12).text(`Fecha: ${currentDate}`, 50, 150);
      }

      // Función para agregar datos del doctor
      function addDoctorData() {
        const doctorTitle =
          consultationData.doctor.sex === "MASCULINO" ? "Dr." : "Dra.";
        const specialty = consultationData.doctor.specialty?.name || "N/A";

        doc.rect(15, 190, 565, 55).stroke();

        doc
          .fontSize(10)
          .text(
            `${doctorTitle} ${consultationData.doctor.names} ${consultationData.doctor.surenames}`,
            30,
            200
          )
          .text(
            `CMP: ${consultationData.doctor.cmpNumber || "N/A"}`,
            30,
            215
          )
          .text(`Especialidad: ${specialty}`, 30, 230);
      }

      // Función para agregar datos del paciente
      function addPatientData() {
        doc.rect(15, 245, 565, 55).stroke();

        doc
          .fontSize(10)
          .text(
            `Paciente: ${consultationData.patient.user.names} ${consultationData.patient.user.surenames}`,
            30,
            255
          )
          .text(`DNI: ${consultationData.patient.user.dni}`, 30, 270)
          .text(
            `Edad: ${consultationData.patient.age} años - Sexo: ${consultationData.patient.sex}`,
            30,
            285
          );
      }

      // Función para agregar diagnóstico
      function addDiagnostic() {
        const diagnostic =
          consultationData.diagnostic?.toUpperCase() || "N/A";
        doc.fontSize(10).text("DIAGNÓSTICO: ", 50, 260).text(diagnostic, 130, 260);
      }

      // Función para agregar tratamientos
      function addTreatments() {
        let offsetY = 290;

        medicalTreatament.forEach((item) => {
          doc
            .fontSize(10)
            .text("VÍA DE ADMINISTRACIÓN: ", 50, offsetY)
            .text(item.viaAdministracion.toUpperCase(), 175, offsetY)
            .text("FITOCANNABINOIDES: ", 50, offsetY + 15)
            .text(item.fitocannabinoides.toUpperCase(), 175, offsetY + 15)
            .text("CONCENTRACIÓN: ", 50, offsetY + 30)
            .text(item.concentracion.toUpperCase(), 175, offsetY + 30)
            .text("POSOLOGÍA: ", 50, offsetY + 45)
            .text(item.posologia.toUpperCase(), 175, offsetY + 45)
            .text("TIEMPO DE TRATAMIENTO: ", 50, offsetY + 60)
            .text(
              item.tiempoTratamiento.toUpperCase(),
              175,
              offsetY + 60
            );

          offsetY += 155;
        });

        doc.rect(15, 275, 565, offsetY + 100).stroke();
      }

      // Firma del doctor (sin Jimp, usando directamente la imagen)
      async function addDoctorSignature() {
        const sigFile = consultationData?.doctor?.signatureImage;
        if (!sigFile) {
          console.warn(
            "No doctor signatureImage found in consultationData.doctor"
          );
          return;
        }

        const signaturePath = path.join(getSignaturePath(), sigFile);
        console.log("Doctor signature path:", signaturePath);

        if (!fs.existsSync(signaturePath)) {
          console.warn(`Doctor signature file not found: ${signaturePath}`);
          // No rompemos el PDF, simplemente lo generamos sin firma
          return;
        }

        try {
          // PDFKit soporta PNG/JPG directamente, no hace falta convertir
          doc.image(signaturePath, 330, 600, { width: 180 });
        } catch (err) {
          console.error("Error adding doctor signature image:", err);
          // Si falla la imagen, igual dejamos que el PDF se genere
        }
      }

      // Agregar todos los elementos al PDF
      addHeader();
      addDoctorData();
      addPatientData();
      addDiagnostic();
      addTreatments();

      // Agregar la firma del doctor y finalizar el documento
      await addDoctorSignature();
      doc.text("REEVALUACIÓN EN 1 MES A PARTIR DE LA FECHA.", 50, 750);

      doc.end();
      writeStream.on("finish", () => resolve(pdfPath));
    } catch (error) {
      console.error("Error generating medical recipe:", error);
      reject(error);
    }
  });
}

function getPdfPath(consultationData) {
  const names = consultationData.patient.user.names.replace(" ", "");
  const surenames = consultationData.patient.user.surenames.replace(" ", "");
  const fileName = `${names}_${surenames}_consulta_${moment(
    consultationData.createDate
  ).format("DD-MM-YY")}.pdf`;

  let basePath;

  if (environments.currentEnv === "PROD") {
    // En Render el código corre desde /opt/render/project/src/dist/controllers/medicalConsultation
    // Subimos 3 niveles hasta /opt/render/project/src y usamos CannaDocs ahí
    basePath = path.join(__dirname, "../../..", "CannaDocs");
  } else {
    // En local puedes seguir usando "docs" como antes
    basePath = "docs";
  }

  // Aseguramos que la carpeta exista
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }

  const pdfPath = path.join(basePath, fileName);
  console.log("PDF Path:", pdfPath);
  return pdfPath;
}

// Función para obtener la ruta de la firma del doctor
function getSignaturePath() {
  let dir;

  if (environments.currentEnv === "PROD") {
    dir = path.join(__dirname, "../../..", "CannaDocs", "doctorSignatures");
  } else {
    dir = path.join("docs", "doctorSignatures");
  }

  // Aseguramos que la carpeta exista (en Render ya debería venir del repo, pero por si acaso)
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (e) {
    console.warn("No se pudo asegurar la carpeta de firmas del doctor:", e);
  }

  return dir;
}

module.exports = generateMedicalRecipe;
