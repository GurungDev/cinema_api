import { config } from "dotenv";
import { join } from "path";
import { ExpressError } from "../common/class/error";

config({
  path: join(__dirname, "..", "..", ".env"),
});

export class EnvConfig {
  constructor() {
    throw new ExpressError(400, `Can't instance static class`);
  }

  public static appConfig = {
    port: EnvConfig.parseInt(EnvConfig.getFromEnv("PORT")),
    nodeEnv: EnvConfig.parseString(EnvConfig.getFromEnv("NODE_ENV")),
    isDev:
      EnvConfig.parseString(EnvConfig.getFromEnv("NODE_ENV")) === "development",
    isProd:
      EnvConfig.parseString(EnvConfig.getFromEnv("NODE_ENV")) === "production",
  };

  public static dbConfig = {
    dbName: this.parseString(this.getFromEnv("DB_NAME")),
    dbPort: this.parseInt(this.getFromEnv("DB_PORT")),
    dbHost: this.parseString(this.getFromEnv("DB_HOST")),
    dbUsername: this.parseString(this.getFromEnv("DB_USERNAME")),
    dbPassword: this.parseString(this.getFromEnv("DB_PASSWORD")),
    dbSync: this.parseBoolean(this.getFromEnv("DB_SYNCHRONIZE")),
    dbSSL: this.parseString(this.getFromEnv("DB_SSL")),
  };

  public static jwtSecret = this.parseString(this.getFromEnv("JWT_SECRET"));
  public static jwtExpiresInSec = this.parseInt(
    this.getFromEnv("JWT_EXPIRY_SEC")
  );

  public static superAdminConfig = {
    password: this.parseString(this.getFromEnv("SUPER_ADMIN_PASSWORD")),
  };

  public static adminConfig = {
    password: this.parseString(this.getFromEnv("ADMIN_PASSWORD")),
  };

  public static mailConfig = {
    noReplySender: this.parseString(this.getFromEnv("NO_REPLY_SENDER")),
    providerApiSecret: this.parseString(this.getFromEnv("PROVIDER_API_KEY")),
  };

  public static frontendUrl = this.parseString(this.getFromEnv("FRONTEND_URL"));
  public static vTokenValidityInSec = this.parseInt(
    this.getFromEnv("VERIFICATION_TOKEN_EXPIRY_SEC")
  );

  public static s3Config = {
    endpoint: this.parseString(this.getFromEnv("ENDPOINT")),
    region: this.parseString(this.getFromEnv("REGION")),
    bucket: this.parseString(this.getFromEnv("BUCKET")),
    accessKey: this.parseString(this.getFromEnv("ACCESSKEY")),
    secretKey: this.parseString(this.getFromEnv("SECRETKEY")),
  };

  public static smsConfig = {
    sparrow: {
      url: this.parseString(this.getFromEnv("SPARROW_URL")),
      token: this.parseString(this.getFromEnv("SPARROW_TOKEN")),
      sender: this.parseString(this.getFromEnv("SPARROW_SENDER")),
    },
  };

  public static firebaseConfig = {
    clientEmail: this.parseString(this.getFromEnv("CLIENT_EMAIL")),
    projectId: this.parseString(this.getFromEnv("PROJECT_ID")),
    privateKey: this.parseString(this.getFromEnv("PRIVATE_KEY")),
  };
  public static khaltiConfig = {
    url: this.parseString(this.getFromEnv("KHALTI_URL")),
    secretKey: this.parseString(this.getFromEnv("KHALTI_SECRETKEY")),
    publicKey: this.parseString(this.getFromEnv("KHALTI_PUBLICKEY"))
  };

  public static EsewaConfig = {
    url: this.parseString(this.getFromEnv("ESEWA_URL")),
 
  };
  public static thumbnailCompression = this.parseInt(
    this.getFromEnv("THUMBNAIL_COMPRESSION")
  );

  private static getFromEnv(key: string) {
    return process.env[key];
  }

  private static parseInt(value: string | undefined): number {
    if (!value) {
      throw new Error(`${value} is missing in Config. type: number`);
    }
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
      throw new Error("This config is not of correct type");
    }
    return parsedValue;
  }

  private static parseString(value: string | undefined): string {
    if (!value) {
      throw new Error(`${value} is missing in Config. type: string`);
    }
    return value;
  }

  private static parseBoolean(value: string | undefined): boolean {
    if (!value) {
      throw new Error(`Boolean value is missing in Config.`);
    }

    if (!(value === "true" || value === "false")) {
      throw new Error(`Boolean valve is invalid.`);
    }

    return value === "true" ? true : false;
  }

  private static parseArrayOfString(value: string | undefined) {
    if (!value) {
      throw new Error(`Missing Env value in Conig type: arrayOfString.`);
    }
    return value.split(",");
  }
}
