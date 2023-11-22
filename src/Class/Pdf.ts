import { jsPDF } from 'jspdf';

const DEFAULT_MARGIN = 10;
const LINE_HEIGHT_TITLE = 10;
const LINE_HEIGHT_CONTENT = 8;
const FONT_SIZE_TITLE = 16;
const FONT_SIZE_CONTENT = 12;

class PDFGenerator {
	pdf: jsPDF;
	currentCount: number;
	pageCount: number;

	constructor() {
		this.pdf = new jsPDF();
		this.currentCount = DEFAULT_MARGIN;
		this.pageCount = 0;
	}

	addTitle(title: string) {
		this.currentCount += LINE_HEIGHT_TITLE;
		this.pdf.setFontSize(FONT_SIZE_TITLE);
		this.pdf.text(title, DEFAULT_MARGIN, this.currentCount);
	}

	addContent(content: string) {
		this.currentCount += LINE_HEIGHT_CONTENT;
		this.pdf.setFontSize(FONT_SIZE_CONTENT);
		this.pdf.text(content, DEFAULT_MARGIN, this.currentCount);
	}

	addPageWithTitle(title: string) {
		this.currentCount = DEFAULT_MARGIN;
		this.pdf.addPage();
		this.pageCount++;

		this.addTitle(title);
	}

	addSection(title: string, content: string) {
		this.addPageWithTitle(title);
		this.addContent(content);
	}

	generateAndDownload(filename = 'Musical') {
		try {
			const blob = this.pdf.output('blob');
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = `${filename}.pdf`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error('Error generating or downloading PDF:', error);
		}
	}
}

export default PDFGenerator;
