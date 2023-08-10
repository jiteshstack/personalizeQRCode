const fs = require('fs');
const vCardsJS = require('vcards-js');
const QRCode = require('qrcode');

// Create a new vCard
const vCard = vCardsJS();


// Console message
console.log('Arguments passed:', process.argv[2]);

// Set the contact details
vCard.firstName = process.argv[2] ?? 'Your Name';
vCard.lastName = process.argv[3] ?? 'Your Surname';
vCard.cellPhone = process.argv[4] ?? '+919XXXXXX91';
vCard.workEmail = process.argv[5] ?? 'abcd@example.com';
vCard.title = process.argv[6] ?? 'Your Position';
vCard.organization = process.argv[7] ?? 'Example Pvt. Ltd.';
vCard.workUrl = process.argv[8] ?? 'https://example.com';
vCard.socialUrls.linkedIn = process.argv[9] ?? 'https://www.linkedin.com/in/rexample/';
vCard.socialUrls.twitter = process.argv[10] ?? 'https://twitter.com/example';
vCard.photo.attachFromUrl('https://example.com/images/example.png','PNG');

// Generate the VCF content
// const vcfContent = vCard.getFormattedString();
let vCardString = vCard.getFormattedString();
vcfContent = vCardString.replace(/SOCIALPROFILE;CHARSET=UTF-8;/gm, "SOCIALPROFILE;");


// Save the VCF content to a file
fs.writeFile('contact.vcf', vcfContent, 'utf8', (err) => {
  if (err) {
    console.error('Error writing VCF file:', err);
  } else {
    console.log('VCF file saved successfully!');
  }
});



// Read the contact.vcf file
fs.readFile('contact.vcf', 'utf8', (err, vcfContent) => {
  if (err) {
    console.error('Error reading contact.vcf file:', err);
  } else {
    // Generate the QR code from VCF content
    QRCode.toFile(
      process.argv[2].toString()+' '+process.argv[3].toString()+'.png', // Output image file path
      // 'contact_qr_code.png', // Output image file path

      vcfContent,            // VCF content
      { type: 'png' },       // QR code options (optional)
      (qrCodeErr) => {
        if (qrCodeErr) {
          console.error('Error generating QR code:', qrCodeErr);
        } else {
          console.log('QR code generated successfully!');
        }
      }
    );
  }
});
