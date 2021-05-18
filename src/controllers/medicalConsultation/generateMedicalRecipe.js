const moment = require('moment-timezone');
const environments = require('../../environments/varEnvironments');
const fs = require('fs');
const Jimp = require("jimp")

function generateMedicalRecipe(consultationData, medicalTreatament, type) {
    return new Promise(async(resolve, reject) => {
        try {
            global.window = { document: { createElementNS: () => { return {} } } };
            global.navigator = {};
            global.btoa = () => {};
            global.atob = require('atob');

            const fs = require('fs')
            const jsPDF = require('jspdf/dist/jspdf.node.min.js');

            const doc = new jsPDF('p', 'pt');

            const img = 'data:image/jpeg;base64,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'

            doc.addImage(img, "JPEG", 390, -10, 220, 170);


            doc.setFontSize(22);
            doc.text(15, 65, 'CENTRO MÉDICO CANNAHOPE');
            doc.setLineWidth(1.5);
            doc.line(15, 68, 347, 68);
            doc.setFontSize(13);
            doc.text(15, 88, 'Av. Larco 345 of. 1005 – Miraflores');
            doc.text(15, 100, 'contacto@centrocannahope.com');
            doc.text(15, 116, '+51 954 761 773');

            doc.setLineWidth(0.5);
            doc.setFontSize(10);

            doc.rect(475, 128, 105, 22);
            doc.text(482, 145, 'FECHA: ');
            doc.text(525, 145, `${moment(consultationData.createDate).format('DD-MM-YYYY')}`);

            doc.rect(15, 150, 565, 40);
            doc.setFontSize(9);
            doc.text(20, 163, 'MÉDICO: ');

            if (consultationData.doctor.sex == "MASCULINO") 
            doc.text(62, 163, `Dr. ${consultationData.doctor.names.toUpperCase()} ${consultationData.doctor.surenames.toUpperCase()}`);
            else
            doc.text(62, 163, `Dra. ${consultationData.doctor.names.toUpperCase()} ${consultationData.doctor.surenames.toUpperCase()}`);

            
            doc.text(20, 173, 'ESPECIALIDAD: ');

            let sp = '';
            if (consultationData.doctor.specialty) {
                sp = consultationData.doctor.specialty.name
            } else {
                sp = 'N/A'
            }

            doc.text(90, 173, sp.toUpperCase());
            doc.text(20, 183, 'CMP: ');
            doc.text(45, 183, `${consultationData?.doctor?.doctorCmp || ''}`);
            doc.setFontSize(9);
            doc.text(300, 163, 'PACIENTE: ');
            doc.text(352, 163, `${consultationData.patient.user.names.toUpperCase()} ${consultationData.patient.user.surenames.toUpperCase()}`);
            doc.text(300, 173, 'DNI: ');
            doc.text(320, 173, `${consultationData.patient.user.document}`);
            doc.text(300, 183, 'EDAD: ');
            doc.text(330, 183, `${consultationData.patient.user.age}`);

            let diagnostic = '';
            if (consultationData.medicalDiagnostic.disease.length) {
                consultationData.medicalDiagnostic.disease.forEach(item => {
                    if (diagnostic.length > 1) diagnostic += ', '
                    diagnostic += `${item.name.toUpperCase()}`
                });
            }

            doc.setLineWidth(0.3);
            doc.rect(15, 190, 565, 20);
            doc.text(20, 203, 'DIAGNÓSTICO: ');
            doc.text(90, 203, diagnostic);

            doc.rect(15, 190, 565, 510);
            doc.setLineWidth(0.3);

            // -----------------------------------------------

            let counster = 0;
            medicalTreatament.forEach((item, i) => {
                doc.text(20, 230 + counster, 'VIA DE ADMINISTRACIÓN: ');
                doc.text(135, 230 + counster, `${item.viaAdministracion.toUpperCase()}`);

                doc.text(20, 245 + counster, 'FITOCANNABINOIDES: ');
                doc.text(135, 245 + counster, item.fitocannabinoides.toUpperCase());

                doc.text(20, 260 + counster, 'CONCENTRACION: ');
                doc.text(135, 260 + counster, item.concentracion.toUpperCase());

                doc.text(20, 275 + counster, 'RATIO: ');
                doc.text(135, 275 + counster, item.ratio.toUpperCase());

                doc.text(20, 290 + counster, 'FRECUENCIA: ');
                if (item.frequency && item.frequency === 'CONDICIONAL') {
                    doc.text(135, 290 + counster, `${item.frequency.toUpperCase()}`);
                } else {
                    doc.text(135, 290 + counster, `${item.frequency.toUpperCase()} VECES POR DÍA`);
                }

                if (item.amountPerDose) {
                    doc.text(20, 305 + counster, 'GOTAS POR DÍA: ');
                    doc.text(135, 305 + counster, `${item.amountPerDose}`);
                }

                if (item.conditions) {
                    const strArrConditions = doc.splitTextToSize(`${item.conditions}`, 400);
                    doc.text(20, 320 + counster, 'CONDICIONES: ');
                    doc.text(20, 330 + counster, strArrConditions);
                }

                doc.setLineWidth(0.1);
                doc.rect(255, 223 + counster, 320, 68);
                const strtArrObservations = doc.splitTextToSize(item.observations || '', 300)
                doc.text(257, 220 + counster, 'OBSERVACIONES: ');
                doc.text(260, 235 + counster, strtArrObservations);
                doc.line(20, 355 + counster, 580, 355 + counster);

                counster += 147;
            }
            
            );

            const signaturepath = environments.currentEnv === 'PROD' ? '/apis/cannahope-api/docs/doctorSignatures/' : 'docs/doctorSignatures/';

            if (consultationData.doctor.signatureImage) {
                Jimp.read(`${signaturepath}${consultationData.doctor.signatureImage}`, async(error, image) => {
                    if (error) {} else {
                        const newPath = `${signaturepath}doctor-${consultationData.doctor.signatureImage.split('.')[0]}.jpg`;
                        const x = await image.write(newPath);


                        setTimeout(() => {
                            var vitmap = fs.readFileSync(`${signaturepath}doctor-${consultationData.doctor.signatureImage.split('.')[0]}.jpg`);
                            doc.addImage(vitmap, 'JPEG', 330, 680, 180, 180);

                            doc.text(15, 710, 'REEVALUACIÓN EN 1 MES A PARTIR DE LA FECHA.');


                            if (consultationData.recomendations && consultationData.recomendations.length > 1) {
                                doc.addPage();
                                const img = 'data:image/jpeg;base64,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'
                                doc.addImage(img, "JPEG", 390, -10, 220, 170);
                                doc.setFontSize(22);
                                doc.text(15, 65, 'CENTRO MÉDICO CANNAHOPE');
                                doc.setLineWidth(1.5);
                                doc.line(15, 68, 347, 68);
                                doc.setFontSize(13);
                                doc.text(15, 88, 'Av. Larco 345 of. 1005 – Miraflores');
                                doc.text(15, 100, 'contacto@centrocannahope.com');
                                doc.text(15, 116, '+51 954 761 773');

                                doc.setLineWidth(0.5);
                                doc.setFontSize(10);

                                doc.rect(475, 128, 105, 22);
                                doc.text(482, 145, 'FECHA: ');
                                doc.text(525, 145, `${moment(consultationData.createDate).format('DD-MM-YYYY')}`);

                                doc.rect(15, 150, 565, 40);
                                doc.setFontSize(9);
                                doc.text(20, 163, 'MÉDICO: ');
                                //doc.text(62, 163, `Dr. ${consultationData.doctor.names.toUpperCase()} ${consultationData.doctor.surenames.toUpperCase()}`);
                                if (consultationData.doctor.sex == "MASCULINO") 
                                doc.text(62, 163, `Dr. ${consultationData.doctor.names.toUpperCase()} ${consultationData.doctor.surenames.toUpperCase()}`);
                                else
                                doc.text(62, 163, `Dra. ${consultationData.doctor.names.toUpperCase()} ${consultationData.doctor.surenames.toUpperCase()}`);

                                
                                
                                doc.text(20, 173, 'ESPECIALIDAD: ');

                                let sp = '';
                                if (consultationData.doctor.specialty) {
                                    sp = consultationData.doctor.specialty.name
                                } else {
                                    sp = 'N/A'
                                }

                                doc.text(90, 173, sp.toUpperCase());
                                doc.text(20, 183, 'CMP: ');
                                doc.text(45, 183, `${consultationData?.doctor?.doctorCmp || ''}`);
                                doc.setFontSize(9);
                                doc.text(300, 163, 'PACIENTE: ');
                                doc.text(352, 163, `${consultationData.patient.user.names.toUpperCase()} ${consultationData.patient.user.surenames.toUpperCase()}`);
                                doc.text(300, 173, 'DNI: ');
                                doc.text(320, 173, `${consultationData.patient.user.document}`);
                                doc.text(300, 183, 'EDAD: ');
                                doc.text(330, 183, `${consultationData.patient.user.age}`);

                                let diagnostic = '';
                                if (consultationData.medicalDiagnostic.disease.length) {
                                    consultationData.medicalDiagnostic.disease.forEach(item => {
                                        if (diagnostic.length > 1) diagnostic += ', '
                                        diagnostic += `${item.name.toUpperCase()}`
                                    });
                                }

                                doc.setLineWidth(0.3);
                                doc.rect(15, 190, 565, 20);
                                doc.text(20, 203, 'DIAGNÓSTICO: ');
                                doc.text(90, 203, diagnostic);

                                doc.rect(15, 190, 565, 510);
                                doc.setLineWidth(0.3);

                                // -----------------------------------------------
                                const strArrConditions = doc.splitTextToSize(`${consultationData.recomendations}`, 500);
                                doc.text(20, 230, 'RECOMENDACIONES: ');
                                doc.text(20, 240, strArrConditions);

                                // var vitmap = fs.readFileSync(`${signaturepath}doctor-${consultationData.doctor.signatureImage.split('.')[0]}.jpg`);
                                doc.addImage(vitmap, 'JPEG', 330, 630, 190, 190);
                                doc.text(15, 710, 'REEVALUACIÓN EN 1 MES A PARTIR DE LA FECHA.');
                                doc.setLineWidth(1.5);
                            }


                            if (consultationData.complementaryExams.length > 0) {

                                doc.addPage();

                                const img = 'data:image/jpeg;base64,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'

                                doc.addImage(img, "JPEG", 390, -10, 220, 170);

                                doc.setFontSize(22);
                                doc.text(15, 65, 'CENTRO MÉDICO CANNAHOPE');
                                doc.setLineWidth(1.5);
                                doc.line(15, 68, 347, 68);
                                doc.setFontSize(13);
                                doc.text(15, 88, 'Av. Larco 345 of. 1005 – Miraflores');
                                doc.text(15, 100, 'contacto@centrocannahope.com');
                                doc.text(15, 116, '+51 954 761 773');

                                doc.setLineWidth(0.5);
                                doc.setFontSize(10);

                                doc.rect(475, 128, 105, 22);
                                doc.text(482, 145, 'FECHA: ');
                                doc.text(525, 145, `${moment(consultationData.createDate).format('DD-MM-YYYY')}`);

                                doc.rect(15, 150, 565, 40);
                                doc.setFontSize(9);
                                doc.text(20, 163, 'MÉDICO: ');
                                //doc.text(62, 163, `Dr. ${consultationData.doctor.names.toUpperCase()} ${consultationData.doctor.surenames.toUpperCase()}`);
                                if (consultationData.doctor.sex == "MASCULINO") 
                                doc.text(62, 163, `Dr. ${consultationData.doctor.names.toUpperCase()} ${consultationData.doctor.surenames.toUpperCase()}`);
                                else
                                doc.text(62, 163, `Dra. ${consultationData.doctor.names.toUpperCase()} ${consultationData.doctor.surenames.toUpperCase()}`);

                                doc.text(20, 173, 'ESPECIALIDAD: ');

                                let sp = '';
                                if (consultationData.doctor.specialty) {
                                    sp = consultationData.doctor.specialty.name
                                } else {
                                    sp = 'N/A'
                                }

                                doc.text(90, 173, sp.toUpperCase());
                                doc.text(20, 183, 'CMP: ');
                                doc.text(45, 183, `${consultationData?.doctor?.doctorCmp || ''}`);
                                doc.setFontSize(9);
                                doc.text(300, 163, 'PACIENTE: ');
                                doc.text(352, 163, `${consultationData.patient.user.names.toUpperCase()} ${consultationData.patient.user.surenames.toUpperCase()}`);
                                doc.text(300, 173, 'DNI: ');
                                doc.text(320, 173, `${consultationData.patient.user.document}`);
                                doc.text(300, 183, 'EDAD: ');
                                doc.text(330, 183, `${consultationData.patient.user.age}`);

                                let diagnostic = '';
                                if (consultationData.medicalDiagnostic.disease.length) {
                                    consultationData.medicalDiagnostic.disease.forEach(item => {
                                        if (diagnostic.length > 1) diagnostic += ', '
                                        diagnostic += `${item.name.toUpperCase()}`
                                    });
                                }
m
                                doc.setLineWidth(0.3);
                                doc.rect(15, 190, 565, 20);
                                doc.text(20, 203, 'DIAGNÓSTICO: ');
                                doc.text(90, 203, diagnostic);

                                doc.rect(15, 190, 565, 510);
                                doc.setLineWidth(0.3);

                                // -----------------------------------------------
                                doc.setFontSize(11);
                                doc.text(20, 230, 'EXÁMENES COMPLEMENTARIOS: ');
                                let counster = 0;
                                consultationData.complementaryExams.forEach((item, i) => {
                                    doc.setFontSize(11);
                                    doc.text(20, 260 + counster, `${i + 1}:`);
                                    doc.text(40, 260 + counster, `${item.name}`);
                                    if (item.description) {
                                        doc.setFontSize(8);
                                        doc.text(42, 270 + counster, `${item.description}`);
                                    }

                                    counster += 40;
                                });

                                // var vitmap = fs.readFileSync(`${signaturepath}doctor-${consultationData.doctor.signatureImage.split('.')[0]}.jpg`);
                                doc.addImage(vitmap, 'JPEG', 330, 630, 190, 190);
                                doc.text(15, 710, 'REEVALUACIÓN EN 1 MES A PARTIR DE LA FECHA.');
                                doc.setLineWidth(1.5);

                                // const signaturepath = environments.currentEnv === 'PROD' ? '../docs/doctorSignatures/' : 'docs/doctorSignatures/';
                                // Jimp.read(`${signaturepath}${consultationData.doctor.signatureImage}`, async (error, image) => {
                                //     if (error) {
                                //     } else {
                                //         const newPath = `${signaturepath}doctor-${consultationData.doctor.signatureImage.split('.')[0]}.jpg`;
                                //         const x = await image.write(newPath);

                                //         setTimeout(() => {
                                //             var vitmap = fs.readFileSync(`${signaturepath}doctor-${consultationData.doctor.signatureImage.split('.')[0]}.jpg`);
                                //             doc.addImage(vitmap, 'JPEG', 330, 630, 190, 190);
                                //             doc.text(15, 710, 'REEVALUACIÓN EN 1 MES A PARTIR DE LA FECHA.');
                                //             doc.setLineWidth(1.5);
                                //         }, 2000);
                                //     }
                                // });
                            }

                            doc.setLineWidth(1.5);
                            doc.line(320, 820, 580, 820);

                            doc.setLineWidth(1.5);


                            // ---------------------------------------
                            const names = consultationData.patient.user.names.replace(" ", "");
                            const surenames = consultationData.patient.user.surenames.replace(" ", "");

                            let pathName = `${names}_${surenames}_consulta_${moment(consultationData.createDate).format('DD-MM-YY')}.pdf`;

                            if (environments.currentEnv === 'PROD') {
                                fs.writeFileSync(`../docs/${pathName}`, new Buffer.from(doc.output('arraybuffer')));
                            } else {
                                fs.writeFileSync(`docs/${pathName}`, new Buffer.from(doc.output('arraybuffer')));
                            }
                            resolve(pathName);

                        }, 2000);
                    }
                });

            } else {

                doc.text(15, 710, 'REEVALUACIÓN EN 1 MES A PARTIR DE LA FECHA.');

                doc.setLineWidth(1.5);
                doc.line(320, 820, 580, 820);

                if (consultationData.complementaryExams.length > 0) {

                    doc.addPage();


                    const img = 'data:image/jpeg;base64,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'

                    doc.addImage(img, "JPEG", 390, -10, 220, 170);

                    doc.setFontSize(22);
                    doc.text(15, 65, 'CENTRO MÉDICO CANNAHOPE');
                    doc.setLineWidth(1.5);
                    doc.line(15, 68, 347, 68);
                    doc.setFontSize(13);
                    doc.text(15, 88, 'Av. Larco 345 of. 1005 – Miraflores');
                    doc.text(15, 100, 'contacto@centrocannahope.com');
                    doc.text(15, 116, '+51 954 761 773');

                    doc.setLineWidth(0.5);
                    doc.setFontSize(10);

                    doc.rect(475, 128, 105, 22);
                    doc.text(482, 145, 'FECHA: ');
                    doc.text(525, 145, `${moment(consultationData.createDate).format('DD-MM-YYYY')}`);

                    doc.rect(15, 150, 565, 40);
                    doc.setFontSize(9);
                    doc.text(20, 163, 'MÉDICO: ');
                    //doc.text(62, 163, `Dr. ${consultationData.doctor.names.toUpperCase()} ${consultationData.doctor.surenames.toUpperCase()}`);
                    if (consultationData.doctor.sex == "MASCULINO") 
                        doc.text(62, 163, `Dr. ${consultationData.doctor.names.toUpperCase()} ${consultationData.doctor.surenames.toUpperCase()}`);
                        else
                        doc.text(62, 163, `Dra. ${consultationData.doctor.names.toUpperCase()} ${consultationData.doctor.surenames.toUpperCase()}`);

                    doc.text(20, 173, 'ESPECIALIDAD: ');

                    let sp = '';
                    if (consultationData.doctor.specialty) {
                        sp = consultationData.doctor.specialty.name
                    } else {
                        sp = 'N/A'
                    }



                    doc.text(90, 173, sp.toUpperCase());
                    doc.text(20, 183, 'CMP: ');
                    doc.text(45, 183, `${consultationData?.doctor?.doctorCmp || ''}`);
                    doc.setFontSize(9);
                    doc.text(300, 163, 'PACIENTE: ');
                    doc.text(352, 163, `${consultationData.patient.user.names.toUpperCase()} ${consultationData.patient.user.surenames.toUpperCase()}`);
                    doc.text(300, 173, 'DNI: ');
                    doc.text(320, 173, `${consultationData.patient.user.document}`);
                    doc.text(300, 183, 'EDAD: ');
                    doc.text(330, 183, `${consultationData.patient.user.age}`);

                    let diagnostic = '';
                    if (consultationData.medicalDiagnostic.disease.length) {
                        consultationData.medicalDiagnostic.disease.forEach(item => {
                            if (diagnostic.length > 1) diagnostic += ', '
                            diagnostic += `${item.name.toUpperCase()}`
                        });
                    }

                    doc.setLineWidth(0.3);
                    doc.rect(15, 190, 565, 20);
                    doc.text(20, 203, 'DIAGNÓSTICO: ');
                    doc.text(90, 203, diagnostic);

                    doc.rect(15, 190, 565, 510);
                    doc.setLineWidth(0.3);

                    // -----------------------------------------------
                    doc.setFontSize(11);
                    doc.text(20, 230, 'EXÁMENES COMPLEMENTARIOS: ');
                    let counster = 0;
                    consultationData.complementaryExams.forEach((item, i) => {
                        doc.setFontSize(11);
                        doc.text(20, 260 + counster, `${i + 1}:`);
                        doc.text(40, 260 + counster, `${item.name}`);
                        if (item.description) {
                            doc.setFontSize(8);
                            doc.text(42, 270 + counster, `${item.name}`);
                        }

                        counster += 40;
                    });

                    doc.text(15, 710, 'REEVALUACIÓN EN 1 MES A PARTIR DE LA FECHA.');

                    doc.setLineWidth(1.5);
                    doc.line(320, 820, 580, 820);

                }

                if (consultationData.recomendations && consultationData.recomendations.length > 1) {
                    doc.addPage();
                    const img = 'data:image/jpeg;base64,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'
                    doc.addImage(img, "JPEG", 390, -10, 220, 170);
                    doc.setFontSize(22);
                    doc.text(15, 65, 'CENTRO MÉDICO CANNAHOPE');
                    doc.setLineWidth(1.5);
                    doc.line(15, 68, 347, 68);
                    doc.setFontSize(13);
                    doc.text(15, 88, 'Av. Larco 345 of. 1005 – Miraflores');
                    doc.text(15, 100, 'contacto@centrocannahope.com');
                    doc.text(15, 116, '+51 954 761 773');

                    doc.setLineWidth(0.5);
                    doc.setFontSize(10);

                    doc.rect(475, 128, 105, 22);
                    doc.text(482, 145, 'FECHA: ');
                    doc.text(525, 145, `${moment(consultationData.createDate).format('DD-MM-YYYY')}`);

                    doc.rect(15, 150, 565, 40);
                    doc.setFontSize(9);
                    doc.text(20, 163, 'MÉDICO: ');
                    doc.text(62, 163, `Dr. ${consultationData.doctor.names.toUpperCase()} ${consultationData.doctor.surenames.toUpperCase()}`);
                    doc.text(20, 173, 'ESPECIALIDAD: ');

                    let sp = '';
                    if (consultationData.doctor.specialty) {
                        sp = consultationData.doctor.specialty.name
                    } else {
                        sp = 'N/A'
                    }

                    doc.text(90, 173, sp.toUpperCase());
                    doc.text(20, 183, 'CMP: ');
                    doc.text(45, 183, `${consultationData?.doctor?.doctorCmp || ''}`);
                    doc.setFontSize(9);
                    doc.text(300, 163, 'PACIENTE: ');
                    doc.text(352, 163, `${consultationData.patient.user.names.toUpperCase()} ${consultationData.patient.user.surenames.toUpperCase()}`);
                    doc.text(300, 173, 'DNI: ');
                    doc.text(320, 173, `${consultationData.patient.user.document}`);
                    doc.text(300, 183, 'EDAD: ');
                    doc.text(330, 183, `${consultationData.patient.user.age}`);

                    let diagnostic = '';
                    if (consultationData.medicalDiagnostic.disease.length) {
                        consultationData.medicalDiagnostic.disease.forEach(item => {
                            if (diagnostic.length > 1) diagnostic += ', '
                            diagnostic += `${item.name.toUpperCase()}`
                        });
                    }

                    doc.setLineWidth(0.3);
                    doc.rect(15, 190, 565, 20);
                    doc.text(20, 203, 'DIAGNÓSTICO: ');
                    doc.text(90, 203, diagnostic);

                    doc.rect(15, 190, 565, 510);
                    doc.setLineWidth(0.3);

                    // -----------------------------------------------

                    const strArrConditions = doc.splitTextToSize(`${consultationData.recomendations}`, 500);
                    doc.text(20, 230, 'RECOMENDACIONES: ');
                    doc.text(20, 240, strArrConditions);

                    doc.text(15, 710, 'REEVALUACIÓN EN 1 MES A PARTIR DE LA FECHA.');
                    doc.setLineWidth(1.5);
                    doc.line(320, 820, 580, 820);
                }

                const names = consultationData.patient.user.names.replace(" ", "");
                const surenames = consultationData.patient.user.surenames.replace(" ", "");

                let pathName = `${names}_${surenames}_consulta_${moment(consultationData.createDate).format('DD-MM-YY')}.pdf`;

                if (environments.currentEnv === 'PROD') {
                    fs.writeFileSync(`../docs/${pathName}`, new Buffer.from(doc.output('arraybuffer')));
                } else {
                    fs.writeFileSync(`docs/${pathName}`, new Buffer.from(doc.output('arraybuffer')));
                }
                resolve(pathName);
            }

        } catch (error) {
            reject(error);
        }

    });

}

module.exports = generateMedicalRecipe;