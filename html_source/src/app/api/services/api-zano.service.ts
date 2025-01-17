import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WrapInfo } from '@api/models/wrap-info';
import { VerifiedAssetInfoWhitelist } from '@api/models/assets.model';

@Injectable({
    providedIn: 'root',
})
export class ApiZanoService {
    private httpClient = inject(HttpClient);

    getWrapInfo(): Observable<WrapInfo> {
        return this.httpClient.get<WrapInfo>('https://wrapped.zano.org/api2/get_wrap_info');
    }

    getVerifiedAssetInfoWhitelist(type: 'mainnet' | 'testnet'): Observable<{
        assets: VerifiedAssetInfoWhitelist;
        signature: string;
    }> {
        let url: string;
        if (type === 'mainnet') {
            url = 'https://api.zano.org/assets_whitelist.json';
        } else {
            url = 'https://api.zano.org/assets_whitelist_testnet.json';
        }

        return this.httpClient.get<{ assets: VerifiedAssetInfoWhitelist; signature: string }>(url, {
            headers: { 'Cache-Control': 'no-cache' },
        });
    }
}
