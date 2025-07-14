import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AllConfigType } from '../../../conf/types/config.type';

@Injectable()
export class KeycloakService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async exchangeCodeForTokens(code: string) {
    const clientId = this.configService.getOrThrow('keycloak.clientId', {
      infer: true,
    });
    const clientSecret = this.configService.getOrThrow(
      'keycloak.clientSecret',
      {
        infer: true,
      },
    );
    const redirectUri = this.configService.getOrThrow('keycloak.redirectUri', {
      infer: true,
    });
    const tokenUrl = this.configService.getOrThrow('keycloak.tokenUrl', {
      infer: true,
    });

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('redirect_uri', redirectUri);
    params.append('code', code);

    const { data } = await firstValueFrom(
      this.httpService.post(tokenUrl, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    );

    console.log(data, 'data');

    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      refresh_expires_in: data.refresh_expires_in,
    };
  }

  async refreshToken(refreshToken: string) {
    console.log('testtttttt');
    const clientId = this.configService.getOrThrow('keycloak.clientId', {
      infer: true,
    });
    const clientSecret = this.configService.getOrThrow(
      'keycloak.clientSecret',
      {
        infer: true,
      },
    );
    const tokenUrl = this.configService.getOrThrow('keycloak.tokenUrl', {
      infer: true,
    });

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('refresh_token', refreshToken);

    const { data } = await firstValueFrom(
      this.httpService.post(tokenUrl, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    );

    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      refresh_expires_in: data.refresh_expires_in,
    };
  }

  async logout(refreshToken: string) {
    const clientId = this.configService.getOrThrow('keycloak.clientId', {
      infer: true,
    });
    const clientSecret = this.configService.getOrThrow(
      'keycloak.clientSecret',
      {
        infer: true,
      },
    );
    const logoutUrl = this.configService.getOrThrow('keycloak.logoutUrl', {
      infer: true,
    });

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('refresh_token', refreshToken);

    await firstValueFrom(
      this.httpService.post(logoutUrl, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    );
  }
}
