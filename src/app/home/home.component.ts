import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { marked } from 'marked';
import { tap } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    @ViewChild('markdown', { static: true }) private markdown!: ElementRef;

    private httpClient: HttpClient = inject(HttpClient);
    private destroyRef = inject(DestroyRef);

    public async ngOnInit() {
        const markdownElement = this.markdown.nativeElement as HTMLDivElement;

        this.httpClient
            .get('assets/README.md', { responseType: 'text' })
            .pipe(
                tap(async (content: string) => {
                    markdownElement.innerHTML = await marked.parse(content);
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }
}
