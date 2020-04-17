import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { getFileName, readFile } from 'app/utils';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';
import { FileSaverService } from 'ngx-filesaver';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

type PropsOfType<Q, T> = { [P in keyof T]: T[P] extends Q ? P : never }[keyof T];

@Component({
    templateUrl: './comp4.component.html',
    styleUrls: ['./comp4.component.css']
})
export class Comp4Component implements AfterViewInit
{
    imgUri = '';
    pdfUri = '';
    imgBlob: Blob | null = null;
    pdfBlob: Blob | null = null;
    imgName = '';
    pdfName = '';
    @ViewChild('pdfViewerAutoLoad', { read: PdfJsViewerComponent }) pdfViewerAutoLoad: PdfJsViewerComponent;
    @ViewChild('externalPdfViewer', { read: PdfJsViewerComponent }) externalPdfViewer: PdfJsViewerComponent;
    @ViewChild('downloadPdfViewer', { read: PdfJsViewerComponent }) downloadPdfViewer: PdfJsViewerComponent;
    @ViewChild('pdfContainer') container: ElementRef;
    private sampleImg = '/assets/img/haskell.png';
    private samplePdf = '/assets/pdf/sample.pdf';

    constructor(private http: HttpClient,
                private fileSaverService: FileSaverService)
    {
    }

    // tslint:disable-next-line:member-ordering
    private static computeUri(blob: Blob): Observable<string>
    {
        return readFile(blob, (r, b) => r.readAsDataURL(b));
    }

    ngAfterViewInit(): void
    {
        setTimeout(() =>
        {
            this.execute(this.sampleImg, 'imgBlob', 'imgUri', 'imgName').subscribe();
            this.execute(this.samplePdf, 'pdfBlob', 'pdfUri', 'pdfName').subscribe(({ blob }) =>
            {
                this.pdfViewerAutoLoad.pdfSrc = blob;
                this.pdfViewerAutoLoad.downloadFileName = this.pdfName;
                this.pdfViewerAutoLoad.refresh();

                console.log(URL.createObjectURL(blob));

                const iframe = this.container.nativeElement.querySelector('iframe');
                iframe.addEventListener('load', () =>
                {
                    iframe.contentDocument.querySelector('.toolbar').style.display = 'none';
                    iframe.contentDocument.querySelector('#viewerContainer').style.top = '0';
                });
            });
        });
    }

    openInTab(uri: string, name: string)
    {
        const win = window.open('', name);
        setTimeout(() =>
        {
            setTimeout(() =>
            {
                win.document.title = name;
            });

            win.document.write('<iframe src="' + uri + '" style="position: fixed; border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>');
        });
    }

    downloadFile(blob: Blob, name: string)
    {
        this.fileSaverService.save(blob, name);
    }

    downloadPdf()
    {
        this.downloadPdfViewer.pdfSrc = this.pdfBlob;
        this.downloadPdfViewer.downloadFileName = this.pdfName;
        this.downloadPdfViewer.refresh();
    }

    openPdfInTab()
    {
        this.externalPdfViewer.pdfSrc = this.pdfBlob;
        this.externalPdfViewer.downloadFileName = this.pdfName;
        this.externalPdfViewer.refresh();
    }

    private download(uri: string): Observable<Blob>
    {
        return this.http.get(uri, {
            responseType: 'blob'
        });
    }

    private execute<K1 extends PropsOfType<string, Comp4Component>,
        K2 extends PropsOfType<Blob, Comp4Component>,
        K3 extends PropsOfType<string, Comp4Component>>
    (startUri: string, blobField: K2, uriField: K1, nameField: K3): Observable<{ uri: string, blob: Blob }>
    {
        const name = getFileName(startUri);
        return this.download(startUri).pipe(
            switchMap(blob => Comp4Component.computeUri(blob).pipe(
                map(uri => ({ blob, uri }))
            )),
            tap(({ blob, uri }) =>
                {
                    this[uriField] = uri;
                    this[blobField] = blob;
                    this[nameField] = name;
                }
            )
        );
    }
}
