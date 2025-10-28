import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace AcFunDanmu. */
export namespace AcFunDanmu {

    /** Namespace Im. */
    namespace Im {

        /** Namespace Basic. */
        namespace Basic {

            /** Properties of an AccessPoint. */
            interface IAccessPoint {

                /** AccessPoint addressType */
                addressType?: (AcFunDanmu.Im.Basic.AccessPoint.AddressType|null);

                /** AccessPoint port */
                port?: (number|null);

                /** AccessPoint ipV4 */
                ipV4?: (number|null);

                /** AccessPoint ipV6 */
                ipV6?: (Uint8Array|null);

                /** AccessPoint domain */
                domain?: (string|null);

                /** AccessPoint quic */
                quic?: (number|null);

                /** AccessPoint quicV6 */
                quicV6?: (Uint8Array|null);
            }

            /** Represents an AccessPoint. */
            class AccessPoint implements IAccessPoint {

                /**
                 * Constructs a new AccessPoint.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IAccessPoint);

                /** AccessPoint addressType. */
                public addressType: AcFunDanmu.Im.Basic.AccessPoint.AddressType;

                /** AccessPoint port. */
                public port: number;

                /** AccessPoint ipV4. */
                public ipV4: number;

                /** AccessPoint ipV6. */
                public ipV6: Uint8Array;

                /** AccessPoint domain. */
                public domain: string;

                /** AccessPoint quic. */
                public quic: number;

                /** AccessPoint quicV6. */
                public quicV6: Uint8Array;

                /**
                 * Creates a new AccessPoint instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AccessPoint instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IAccessPoint): AcFunDanmu.Im.Basic.AccessPoint;

                /**
                 * Encodes the specified AccessPoint message. Does not implicitly {@link AcFunDanmu.Im.Basic.AccessPoint.verify|verify} messages.
                 * @param message AccessPoint message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IAccessPoint, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AccessPoint message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.AccessPoint.verify|verify} messages.
                 * @param message AccessPoint message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IAccessPoint, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AccessPoint message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns AccessPoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.AccessPoint;

                /**
                 * Decodes an AccessPoint message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns AccessPoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.AccessPoint;

                /**
                 * Verifies an AccessPoint message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AccessPoint message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AccessPoint
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.AccessPoint;

                /**
                 * Creates a plain object from an AccessPoint message. Also converts values to other types if specified.
                 * @param message AccessPoint
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.AccessPoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AccessPoint to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for AccessPoint
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace AccessPoint {

                /** AddressType enum. */
                enum AddressType {
                    kIPV4 = 0,
                    kIPV6 = 1,
                    kDomain = 2,
                    kQuic = 3,
                    kQuicV6 = 4
                }
            }

            /** Properties of an AccessPointsConfig. */
            interface IAccessPointsConfig {

                /** AccessPointsConfig optimalAps */
                optimalAps?: (AcFunDanmu.Im.Basic.IAccessPoint[]|null);

                /** AccessPointsConfig backupAps */
                backupAps?: (AcFunDanmu.Im.Basic.IAccessPoint[]|null);

                /** AccessPointsConfig availablePorts */
                availablePorts?: (number[]|null);

                /** AccessPointsConfig forceLastConnectedAp */
                forceLastConnectedAp?: (AcFunDanmu.Im.Basic.IAccessPoint|null);
            }

            /** Represents an AccessPointsConfig. */
            class AccessPointsConfig implements IAccessPointsConfig {

                /**
                 * Constructs a new AccessPointsConfig.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IAccessPointsConfig);

                /** AccessPointsConfig optimalAps. */
                public optimalAps: AcFunDanmu.Im.Basic.IAccessPoint[];

                /** AccessPointsConfig backupAps. */
                public backupAps: AcFunDanmu.Im.Basic.IAccessPoint[];

                /** AccessPointsConfig availablePorts. */
                public availablePorts: number[];

                /** AccessPointsConfig forceLastConnectedAp. */
                public forceLastConnectedAp?: (AcFunDanmu.Im.Basic.IAccessPoint|null);

                /**
                 * Creates a new AccessPointsConfig instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AccessPointsConfig instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IAccessPointsConfig): AcFunDanmu.Im.Basic.AccessPointsConfig;

                /**
                 * Encodes the specified AccessPointsConfig message. Does not implicitly {@link AcFunDanmu.Im.Basic.AccessPointsConfig.verify|verify} messages.
                 * @param message AccessPointsConfig message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IAccessPointsConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AccessPointsConfig message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.AccessPointsConfig.verify|verify} messages.
                 * @param message AccessPointsConfig message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IAccessPointsConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AccessPointsConfig message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns AccessPointsConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.AccessPointsConfig;

                /**
                 * Decodes an AccessPointsConfig message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns AccessPointsConfig
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.AccessPointsConfig;

                /**
                 * Verifies an AccessPointsConfig message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AccessPointsConfig message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AccessPointsConfig
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.AccessPointsConfig;

                /**
                 * Creates a plain object from an AccessPointsConfig message. Also converts values to other types if specified.
                 * @param message AccessPointsConfig
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.AccessPointsConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AccessPointsConfig to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for AccessPointsConfig
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an AppInfo. */
            interface IAppInfo {

                /** AppInfo appName */
                appName?: (string|null);

                /** AppInfo appVersion */
                appVersion?: (string|null);

                /** AppInfo appChannel */
                appChannel?: (string|null);

                /** AppInfo sdkVersion */
                sdkVersion?: (string|null);

                /** AppInfo linkVersion */
                linkVersion?: (string|null);

                /** AppInfo extensionInfo */
                extensionInfo?: ({ [k: string]: string }|null);
            }

            /** Represents an AppInfo. */
            class AppInfo implements IAppInfo {

                /**
                 * Constructs a new AppInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IAppInfo);

                /** AppInfo appName. */
                public appName: string;

                /** AppInfo appVersion. */
                public appVersion: string;

                /** AppInfo appChannel. */
                public appChannel: string;

                /** AppInfo sdkVersion. */
                public sdkVersion: string;

                /** AppInfo linkVersion. */
                public linkVersion: string;

                /** AppInfo extensionInfo. */
                public extensionInfo: { [k: string]: string };

                /**
                 * Creates a new AppInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AppInfo instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IAppInfo): AcFunDanmu.Im.Basic.AppInfo;

                /**
                 * Encodes the specified AppInfo message. Does not implicitly {@link AcFunDanmu.Im.Basic.AppInfo.verify|verify} messages.
                 * @param message AppInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IAppInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AppInfo message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.AppInfo.verify|verify} messages.
                 * @param message AppInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IAppInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AppInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns AppInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.AppInfo;

                /**
                 * Decodes an AppInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns AppInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.AppInfo;

                /**
                 * Verifies an AppInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AppInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AppInfo
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.AppInfo;

                /**
                 * Creates a plain object from an AppInfo message. Also converts values to other types if specified.
                 * @param message AppInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.AppInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AppInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for AppInfo
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeviceInfo. */
            interface IDeviceInfo {

                /** DeviceInfo platformType */
                platformType?: (AcFunDanmu.Im.Basic.DeviceInfo.PlatformType|null);

                /** DeviceInfo osVersion */
                osVersion?: (string|null);

                /** DeviceInfo deviceModel */
                deviceModel?: (string|null);

                /** DeviceInfo imeiMd5 */
                imeiMd5?: (Uint8Array|null);

                /** DeviceInfo deviceId */
                deviceId?: (string|null);

                /** DeviceInfo softDid */
                softDid?: (string|null);

                /** DeviceInfo kwaiDid */
                kwaiDid?: (string|null);

                /** DeviceInfo manufacturer */
                manufacturer?: (string|null);

                /** DeviceInfo deviceName */
                deviceName?: (string|null);
            }

            /** Represents a DeviceInfo. */
            class DeviceInfo implements IDeviceInfo {

                /**
                 * Constructs a new DeviceInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IDeviceInfo);

                /** DeviceInfo platformType. */
                public platformType: AcFunDanmu.Im.Basic.DeviceInfo.PlatformType;

                /** DeviceInfo osVersion. */
                public osVersion: string;

                /** DeviceInfo deviceModel. */
                public deviceModel: string;

                /** DeviceInfo imeiMd5. */
                public imeiMd5: Uint8Array;

                /** DeviceInfo deviceId. */
                public deviceId: string;

                /** DeviceInfo softDid. */
                public softDid: string;

                /** DeviceInfo kwaiDid. */
                public kwaiDid: string;

                /** DeviceInfo manufacturer. */
                public manufacturer: string;

                /** DeviceInfo deviceName. */
                public deviceName: string;

                /**
                 * Creates a new DeviceInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeviceInfo instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IDeviceInfo): AcFunDanmu.Im.Basic.DeviceInfo;

                /**
                 * Encodes the specified DeviceInfo message. Does not implicitly {@link AcFunDanmu.Im.Basic.DeviceInfo.verify|verify} messages.
                 * @param message DeviceInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IDeviceInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeviceInfo message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.DeviceInfo.verify|verify} messages.
                 * @param message DeviceInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IDeviceInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeviceInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeviceInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.DeviceInfo;

                /**
                 * Decodes a DeviceInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeviceInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.DeviceInfo;

                /**
                 * Verifies a DeviceInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeviceInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeviceInfo
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.DeviceInfo;

                /**
                 * Creates a plain object from a DeviceInfo message. Also converts values to other types if specified.
                 * @param message DeviceInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.DeviceInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeviceInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeviceInfo
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace DeviceInfo {

                /** PlatformType enum. */
                enum PlatformType {
                    kInvalid = 0,
                    kAndroid = 1,
                    kiOS = 2,
                    kWindows = 3,
                    WECHAT_ANDROID = 4,
                    WECHAT_IOS = 5,
                    H5 = 6,
                    H5_ANDROID = 7,
                    H5_IOS = 8,
                    H5_WINDOWS = 9,
                    H5_MAC = 10,
                    kPlatformNum = 11
                }
            }

            /** Properties of a DownstreamPayload. */
            interface IDownstreamPayload {

                /** DownstreamPayload command */
                command?: (string|null);

                /** DownstreamPayload seqId */
                seqId?: (number|Long|null);

                /** DownstreamPayload errorCode */
                errorCode?: (number|null);

                /** DownstreamPayload payloadData */
                payloadData?: (Uint8Array|null);

                /** DownstreamPayload errorMsg */
                errorMsg?: (string|null);

                /** DownstreamPayload errorData */
                errorData?: (Uint8Array|null);

                /** DownstreamPayload subBiz */
                subBiz?: (string|null);

                /** DownstreamPayload klinkPushId */
                klinkPushId?: (number|Long|null);
            }

            /** Represents a DownstreamPayload. */
            class DownstreamPayload implements IDownstreamPayload {

                /**
                 * Constructs a new DownstreamPayload.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IDownstreamPayload);

                /** DownstreamPayload command. */
                public command: string;

                /** DownstreamPayload seqId. */
                public seqId: (number|Long);

                /** DownstreamPayload errorCode. */
                public errorCode: number;

                /** DownstreamPayload payloadData. */
                public payloadData: Uint8Array;

                /** DownstreamPayload errorMsg. */
                public errorMsg: string;

                /** DownstreamPayload errorData. */
                public errorData: Uint8Array;

                /** DownstreamPayload subBiz. */
                public subBiz: string;

                /** DownstreamPayload klinkPushId. */
                public klinkPushId: (number|Long);

                /**
                 * Creates a new DownstreamPayload instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DownstreamPayload instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IDownstreamPayload): AcFunDanmu.Im.Basic.DownstreamPayload;

                /**
                 * Encodes the specified DownstreamPayload message. Does not implicitly {@link AcFunDanmu.Im.Basic.DownstreamPayload.verify|verify} messages.
                 * @param message DownstreamPayload message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IDownstreamPayload, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DownstreamPayload message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.DownstreamPayload.verify|verify} messages.
                 * @param message DownstreamPayload message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IDownstreamPayload, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DownstreamPayload message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DownstreamPayload
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.DownstreamPayload;

                /**
                 * Decodes a DownstreamPayload message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DownstreamPayload
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.DownstreamPayload;

                /**
                 * Verifies a DownstreamPayload message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DownstreamPayload message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DownstreamPayload
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.DownstreamPayload;

                /**
                 * Creates a plain object from a DownstreamPayload message. Also converts values to other types if specified.
                 * @param message DownstreamPayload
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.DownstreamPayload, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DownstreamPayload to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DownstreamPayload
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an EnvInfo. */
            interface IEnvInfo {

                /** EnvInfo networkType */
                networkType?: (AcFunDanmu.Im.Basic.EnvInfo.NetworkType|null);

                /** EnvInfo apnName */
                apnName?: (Uint8Array|null);
            }

            /** Represents an EnvInfo. */
            class EnvInfo implements IEnvInfo {

                /**
                 * Constructs a new EnvInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IEnvInfo);

                /** EnvInfo networkType. */
                public networkType: AcFunDanmu.Im.Basic.EnvInfo.NetworkType;

                /** EnvInfo apnName. */
                public apnName: Uint8Array;

                /**
                 * Creates a new EnvInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns EnvInfo instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IEnvInfo): AcFunDanmu.Im.Basic.EnvInfo;

                /**
                 * Encodes the specified EnvInfo message. Does not implicitly {@link AcFunDanmu.Im.Basic.EnvInfo.verify|verify} messages.
                 * @param message EnvInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IEnvInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified EnvInfo message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.EnvInfo.verify|verify} messages.
                 * @param message EnvInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IEnvInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an EnvInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns EnvInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.EnvInfo;

                /**
                 * Decodes an EnvInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns EnvInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.EnvInfo;

                /**
                 * Verifies an EnvInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an EnvInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns EnvInfo
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.EnvInfo;

                /**
                 * Creates a plain object from an EnvInfo message. Also converts values to other types if specified.
                 * @param message EnvInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.EnvInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this EnvInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for EnvInfo
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace EnvInfo {

                /** NetworkType enum. */
                enum NetworkType {
                    kInvalid = 0,
                    kWIFI = 1,
                    kCellular = 2
                }
            }

            /** Properties of an ErrorMessage. */
            interface IErrorMessage {

                /** ErrorMessage localeMessages */
                localeMessages?: (AcFunDanmu.Im.Basic.ILocaleMessage[]|null);
            }

            /** Represents an ErrorMessage. */
            class ErrorMessage implements IErrorMessage {

                /**
                 * Constructs a new ErrorMessage.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IErrorMessage);

                /** ErrorMessage localeMessages. */
                public localeMessages: AcFunDanmu.Im.Basic.ILocaleMessage[];

                /**
                 * Creates a new ErrorMessage instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ErrorMessage instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IErrorMessage): AcFunDanmu.Im.Basic.ErrorMessage;

                /**
                 * Encodes the specified ErrorMessage message. Does not implicitly {@link AcFunDanmu.Im.Basic.ErrorMessage.verify|verify} messages.
                 * @param message ErrorMessage message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.ErrorMessage.verify|verify} messages.
                 * @param message ErrorMessage message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an ErrorMessage message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ErrorMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.ErrorMessage;

                /**
                 * Decodes an ErrorMessage message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ErrorMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.ErrorMessage;

                /**
                 * Verifies an ErrorMessage message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an ErrorMessage message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ErrorMessage
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.ErrorMessage;

                /**
                 * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
                 * @param message ErrorMessage
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.ErrorMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ErrorMessage to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ErrorMessage
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a LocaleMessage. */
            interface ILocaleMessage {

                /** LocaleMessage locale */
                locale?: (string|null);

                /** LocaleMessage errorMessage */
                errorMessage?: ({ [k: string]: string }|null);
            }

            /** Represents a LocaleMessage. */
            class LocaleMessage implements ILocaleMessage {

                /**
                 * Constructs a new LocaleMessage.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.ILocaleMessage);

                /** LocaleMessage locale. */
                public locale: string;

                /** LocaleMessage errorMessage. */
                public errorMessage: { [k: string]: string };

                /**
                 * Creates a new LocaleMessage instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LocaleMessage instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.ILocaleMessage): AcFunDanmu.Im.Basic.LocaleMessage;

                /**
                 * Encodes the specified LocaleMessage message. Does not implicitly {@link AcFunDanmu.Im.Basic.LocaleMessage.verify|verify} messages.
                 * @param message LocaleMessage message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.ILocaleMessage, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LocaleMessage message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.LocaleMessage.verify|verify} messages.
                 * @param message LocaleMessage message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.ILocaleMessage, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LocaleMessage message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LocaleMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.LocaleMessage;

                /**
                 * Decodes a LocaleMessage message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LocaleMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.LocaleMessage;

                /**
                 * Verifies a LocaleMessage message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LocaleMessage message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LocaleMessage
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.LocaleMessage;

                /**
                 * Creates a plain object from a LocaleMessage message. Also converts values to other types if specified.
                 * @param message LocaleMessage
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.LocaleMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LocaleMessage to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for LocaleMessage
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a FrontendInfo. */
            interface IFrontendInfo {

                /** FrontendInfo ip */
                ip?: (string|null);

                /** FrontendInfo port */
                port?: (number|null);
            }

            /** Represents a FrontendInfo. */
            class FrontendInfo implements IFrontendInfo {

                /**
                 * Constructs a new FrontendInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IFrontendInfo);

                /** FrontendInfo ip. */
                public ip: string;

                /** FrontendInfo port. */
                public port: number;

                /**
                 * Creates a new FrontendInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns FrontendInfo instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IFrontendInfo): AcFunDanmu.Im.Basic.FrontendInfo;

                /**
                 * Encodes the specified FrontendInfo message. Does not implicitly {@link AcFunDanmu.Im.Basic.FrontendInfo.verify|verify} messages.
                 * @param message FrontendInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IFrontendInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified FrontendInfo message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.FrontendInfo.verify|verify} messages.
                 * @param message FrontendInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IFrontendInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a FrontendInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns FrontendInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.FrontendInfo;

                /**
                 * Decodes a FrontendInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns FrontendInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.FrontendInfo;

                /**
                 * Verifies a FrontendInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a FrontendInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns FrontendInfo
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.FrontendInfo;

                /**
                 * Creates a plain object from a FrontendInfo message. Also converts values to other types if specified.
                 * @param message FrontendInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.FrontendInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this FrontendInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for FrontendInfo
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a HandshakeRequest. */
            interface IHandshakeRequest {

                /** HandshakeRequest unknown1 */
                unknown1?: (number|null);

                /** HandshakeRequest unknown2 */
                unknown2?: (number|null);
            }

            /** Represents a HandshakeRequest. */
            class HandshakeRequest implements IHandshakeRequest {

                /**
                 * Constructs a new HandshakeRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IHandshakeRequest);

                /** HandshakeRequest unknown1. */
                public unknown1: number;

                /** HandshakeRequest unknown2. */
                public unknown2: number;

                /**
                 * Creates a new HandshakeRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns HandshakeRequest instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IHandshakeRequest): AcFunDanmu.Im.Basic.HandshakeRequest;

                /**
                 * Encodes the specified HandshakeRequest message. Does not implicitly {@link AcFunDanmu.Im.Basic.HandshakeRequest.verify|verify} messages.
                 * @param message HandshakeRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IHandshakeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified HandshakeRequest message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.HandshakeRequest.verify|verify} messages.
                 * @param message HandshakeRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IHandshakeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a HandshakeRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns HandshakeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.HandshakeRequest;

                /**
                 * Decodes a HandshakeRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns HandshakeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.HandshakeRequest;

                /**
                 * Verifies a HandshakeRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a HandshakeRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns HandshakeRequest
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.HandshakeRequest;

                /**
                 * Creates a plain object from a HandshakeRequest message. Also converts values to other types if specified.
                 * @param message HandshakeRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.HandshakeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this HandshakeRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for HandshakeRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a HansshakeResponse. */
            interface IHansshakeResponse {

                /** HansshakeResponse unknown1 */
                unknown1?: (number|null);

                /** HansshakeResponse unknown2 */
                unknown2?: (number|null);
            }

            /** Represents a HansshakeResponse. */
            class HansshakeResponse implements IHansshakeResponse {

                /**
                 * Constructs a new HansshakeResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IHansshakeResponse);

                /** HansshakeResponse unknown1. */
                public unknown1: number;

                /** HansshakeResponse unknown2. */
                public unknown2: number;

                /**
                 * Creates a new HansshakeResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns HansshakeResponse instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IHansshakeResponse): AcFunDanmu.Im.Basic.HansshakeResponse;

                /**
                 * Encodes the specified HansshakeResponse message. Does not implicitly {@link AcFunDanmu.Im.Basic.HansshakeResponse.verify|verify} messages.
                 * @param message HansshakeResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IHansshakeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified HansshakeResponse message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.HansshakeResponse.verify|verify} messages.
                 * @param message HansshakeResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IHansshakeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a HansshakeResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns HansshakeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.HansshakeResponse;

                /**
                 * Decodes a HansshakeResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns HansshakeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.HansshakeResponse;

                /**
                 * Verifies a HansshakeResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a HansshakeResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns HansshakeResponse
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.HansshakeResponse;

                /**
                 * Creates a plain object from a HansshakeResponse message. Also converts values to other types if specified.
                 * @param message HansshakeResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.HansshakeResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this HansshakeResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for HansshakeResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a I18nCopyWriting. */
            interface II18nCopyWriting {

                /** I18nCopyWriting formatKey */
                formatKey?: (string|null);

                /** I18nCopyWriting formatParam */
                formatParam?: (string[]|null);
            }

            /** Represents a I18nCopyWriting. */
            class I18nCopyWriting implements II18nCopyWriting {

                /**
                 * Constructs a new I18nCopyWriting.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.II18nCopyWriting);

                /** I18nCopyWriting formatKey. */
                public formatKey: string;

                /** I18nCopyWriting formatParam. */
                public formatParam: string[];

                /**
                 * Creates a new I18nCopyWriting instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns I18nCopyWriting instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.II18nCopyWriting): AcFunDanmu.Im.Basic.I18nCopyWriting;

                /**
                 * Encodes the specified I18nCopyWriting message. Does not implicitly {@link AcFunDanmu.Im.Basic.I18nCopyWriting.verify|verify} messages.
                 * @param message I18nCopyWriting message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.II18nCopyWriting, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified I18nCopyWriting message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.I18nCopyWriting.verify|verify} messages.
                 * @param message I18nCopyWriting message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.II18nCopyWriting, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a I18nCopyWriting message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns I18nCopyWriting
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.I18nCopyWriting;

                /**
                 * Decodes a I18nCopyWriting message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns I18nCopyWriting
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.I18nCopyWriting;

                /**
                 * Verifies a I18nCopyWriting message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a I18nCopyWriting message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns I18nCopyWriting
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.I18nCopyWriting;

                /**
                 * Creates a plain object from a I18nCopyWriting message. Also converts values to other types if specified.
                 * @param message I18nCopyWriting
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.I18nCopyWriting, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this I18nCopyWriting to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for I18nCopyWriting
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a KeepAliveRequest. */
            interface IKeepAliveRequest {

                /** KeepAliveRequest presenceStatus */
                presenceStatus?: (AcFunDanmu.Im.Basic.RegisterRequest.PresenceStatus|null);

                /** KeepAliveRequest appActiveStatus */
                appActiveStatus?: (AcFunDanmu.Im.Basic.RegisterRequest.ActiveStatus|null);

                /** KeepAliveRequest pushServiceToken */
                pushServiceToken?: (AcFunDanmu.Im.Basic.IPushServiceToken|null);

                /** KeepAliveRequest pushServiceTokenList */
                pushServiceTokenList?: (AcFunDanmu.Im.Basic.IPushServiceToken[]|null);

                /** KeepAliveRequest keepaliveIntervalSec */
                keepaliveIntervalSec?: (number|null);

                /** KeepAliveRequest ipv6Available */
                ipv6Available?: (boolean|null);
            }

            /** Represents a KeepAliveRequest. */
            class KeepAliveRequest implements IKeepAliveRequest {

                /**
                 * Constructs a new KeepAliveRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IKeepAliveRequest);

                /** KeepAliveRequest presenceStatus. */
                public presenceStatus: AcFunDanmu.Im.Basic.RegisterRequest.PresenceStatus;

                /** KeepAliveRequest appActiveStatus. */
                public appActiveStatus: AcFunDanmu.Im.Basic.RegisterRequest.ActiveStatus;

                /** KeepAliveRequest pushServiceToken. */
                public pushServiceToken?: (AcFunDanmu.Im.Basic.IPushServiceToken|null);

                /** KeepAliveRequest pushServiceTokenList. */
                public pushServiceTokenList: AcFunDanmu.Im.Basic.IPushServiceToken[];

                /** KeepAliveRequest keepaliveIntervalSec. */
                public keepaliveIntervalSec: number;

                /** KeepAliveRequest ipv6Available. */
                public ipv6Available: boolean;

                /**
                 * Creates a new KeepAliveRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns KeepAliveRequest instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IKeepAliveRequest): AcFunDanmu.Im.Basic.KeepAliveRequest;

                /**
                 * Encodes the specified KeepAliveRequest message. Does not implicitly {@link AcFunDanmu.Im.Basic.KeepAliveRequest.verify|verify} messages.
                 * @param message KeepAliveRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IKeepAliveRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified KeepAliveRequest message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.KeepAliveRequest.verify|verify} messages.
                 * @param message KeepAliveRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IKeepAliveRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a KeepAliveRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns KeepAliveRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.KeepAliveRequest;

                /**
                 * Decodes a KeepAliveRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns KeepAliveRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.KeepAliveRequest;

                /**
                 * Verifies a KeepAliveRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a KeepAliveRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns KeepAliveRequest
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.KeepAliveRequest;

                /**
                 * Creates a plain object from a KeepAliveRequest message. Also converts values to other types if specified.
                 * @param message KeepAliveRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.KeepAliveRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this KeepAliveRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for KeepAliveRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a PushServiceToken. */
            interface IPushServiceToken {

                /** PushServiceToken pushType */
                pushType?: (AcFunDanmu.Im.Basic.PushServiceToken.PushType|null);

                /** PushServiceToken token */
                token?: (Uint8Array|null);

                /** PushServiceToken isPassThrough */
                isPassThrough?: (boolean|null);
            }

            /** Represents a PushServiceToken. */
            class PushServiceToken implements IPushServiceToken {

                /**
                 * Constructs a new PushServiceToken.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IPushServiceToken);

                /** PushServiceToken pushType. */
                public pushType: AcFunDanmu.Im.Basic.PushServiceToken.PushType;

                /** PushServiceToken token. */
                public token: Uint8Array;

                /** PushServiceToken isPassThrough. */
                public isPassThrough: boolean;

                /**
                 * Creates a new PushServiceToken instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PushServiceToken instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IPushServiceToken): AcFunDanmu.Im.Basic.PushServiceToken;

                /**
                 * Encodes the specified PushServiceToken message. Does not implicitly {@link AcFunDanmu.Im.Basic.PushServiceToken.verify|verify} messages.
                 * @param message PushServiceToken message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IPushServiceToken, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PushServiceToken message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.PushServiceToken.verify|verify} messages.
                 * @param message PushServiceToken message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IPushServiceToken, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PushServiceToken message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PushServiceToken
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.PushServiceToken;

                /**
                 * Decodes a PushServiceToken message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PushServiceToken
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.PushServiceToken;

                /**
                 * Verifies a PushServiceToken message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PushServiceToken message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PushServiceToken
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.PushServiceToken;

                /**
                 * Creates a plain object from a PushServiceToken message. Also converts values to other types if specified.
                 * @param message PushServiceToken
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.PushServiceToken, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PushServiceToken to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for PushServiceToken
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace PushServiceToken {

                /** PushType enum. */
                enum PushType {
                    kPushTypeInvalid = 0,
                    kPushTypeAPNS = 1,
                    kPushTypeXmPush = 2,
                    kPushTypeJgPush = 3,
                    kPushTypeGtPush = 4,
                    kPushTypeOpPush = 5,
                    kPushTypeVvPush = 6,
                    kPushTypeHwPush = 7,
                    kPushTypeFcm = 8
                }
            }

            /** Properties of a RegisterRequest. */
            interface IRegisterRequest {

                /** RegisterRequest appInfo */
                appInfo?: (AcFunDanmu.Im.Basic.IAppInfo|null);

                /** RegisterRequest deviceInfo */
                deviceInfo?: (AcFunDanmu.Im.Basic.IDeviceInfo|null);

                /** RegisterRequest envInfo */
                envInfo?: (AcFunDanmu.Im.Basic.IEnvInfo|null);

                /** RegisterRequest presenceStatus */
                presenceStatus?: (AcFunDanmu.Im.Basic.RegisterRequest.PresenceStatus|null);

                /** RegisterRequest appActiveStatus */
                appActiveStatus?: (AcFunDanmu.Im.Basic.RegisterRequest.ActiveStatus|null);

                /** RegisterRequest appCustomStatus */
                appCustomStatus?: (Uint8Array|null);

                /** RegisterRequest pushServiceToken */
                pushServiceToken?: (AcFunDanmu.Im.Basic.IPushServiceToken|null);

                /** RegisterRequest instanceId */
                instanceId?: (number|Long|null);

                /** RegisterRequest pushServiceTokenList */
                pushServiceTokenList?: (AcFunDanmu.Im.Basic.IPushServiceToken[]|null);

                /** RegisterRequest keepaliveIntervalSec */
                keepaliveIntervalSec?: (number|null);

                /** RegisterRequest ztCommonInfo */
                ztCommonInfo?: (AcFunDanmu.Im.Basic.IZtCommonInfo|null);

                /** RegisterRequest ipv6Available */
                ipv6Available?: (boolean|null);
            }

            /** Represents a RegisterRequest. */
            class RegisterRequest implements IRegisterRequest {

                /**
                 * Constructs a new RegisterRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IRegisterRequest);

                /** RegisterRequest appInfo. */
                public appInfo?: (AcFunDanmu.Im.Basic.IAppInfo|null);

                /** RegisterRequest deviceInfo. */
                public deviceInfo?: (AcFunDanmu.Im.Basic.IDeviceInfo|null);

                /** RegisterRequest envInfo. */
                public envInfo?: (AcFunDanmu.Im.Basic.IEnvInfo|null);

                /** RegisterRequest presenceStatus. */
                public presenceStatus: AcFunDanmu.Im.Basic.RegisterRequest.PresenceStatus;

                /** RegisterRequest appActiveStatus. */
                public appActiveStatus: AcFunDanmu.Im.Basic.RegisterRequest.ActiveStatus;

                /** RegisterRequest appCustomStatus. */
                public appCustomStatus: Uint8Array;

                /** RegisterRequest pushServiceToken. */
                public pushServiceToken?: (AcFunDanmu.Im.Basic.IPushServiceToken|null);

                /** RegisterRequest instanceId. */
                public instanceId: (number|Long);

                /** RegisterRequest pushServiceTokenList. */
                public pushServiceTokenList: AcFunDanmu.Im.Basic.IPushServiceToken[];

                /** RegisterRequest keepaliveIntervalSec. */
                public keepaliveIntervalSec: number;

                /** RegisterRequest ztCommonInfo. */
                public ztCommonInfo?: (AcFunDanmu.Im.Basic.IZtCommonInfo|null);

                /** RegisterRequest ipv6Available. */
                public ipv6Available: boolean;

                /**
                 * Creates a new RegisterRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RegisterRequest instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IRegisterRequest): AcFunDanmu.Im.Basic.RegisterRequest;

                /**
                 * Encodes the specified RegisterRequest message. Does not implicitly {@link AcFunDanmu.Im.Basic.RegisterRequest.verify|verify} messages.
                 * @param message RegisterRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IRegisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RegisterRequest message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.RegisterRequest.verify|verify} messages.
                 * @param message RegisterRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IRegisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RegisterRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RegisterRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.RegisterRequest;

                /**
                 * Decodes a RegisterRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RegisterRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.RegisterRequest;

                /**
                 * Verifies a RegisterRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RegisterRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RegisterRequest
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.RegisterRequest;

                /**
                 * Creates a plain object from a RegisterRequest message. Also converts values to other types if specified.
                 * @param message RegisterRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.RegisterRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RegisterRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for RegisterRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace RegisterRequest {

                /** PresenceStatus enum. */
                enum PresenceStatus {
                    kPresenceOffline = 0,
                    kPresenceOnline = 1
                }

                /** ActiveStatus enum. */
                enum ActiveStatus {
                    kInvalid = 0,
                    kAppInForeground = 1,
                    kAppInBackground = 2
                }
            }

            /** Properties of a ZtCommonInfo. */
            interface IZtCommonInfo {

                /** ZtCommonInfo kpn */
                kpn?: (string|null);

                /** ZtCommonInfo kpf */
                kpf?: (string|null);

                /** ZtCommonInfo subBiz */
                subBiz?: (string|null);

                /** ZtCommonInfo uid */
                uid?: (number|Long|null);

                /** ZtCommonInfo did */
                did?: (string|null);

                /** ZtCommonInfo clientIp */
                clientIp?: (number|Long|null);

                /** ZtCommonInfo appVer */
                appVer?: (string|null);

                /** ZtCommonInfo ver */
                ver?: (string|null);

                /** ZtCommonInfo lat */
                lat?: (string|null);

                /** ZtCommonInfo lon */
                lon?: (string|null);

                /** ZtCommonInfo mod */
                mod?: (string|null);

                /** ZtCommonInfo net */
                net?: (string|null);

                /** ZtCommonInfo sys */
                sys?: (string|null);

                /** ZtCommonInfo c */
                c?: (string|null);

                /** ZtCommonInfo language */
                language?: (string|null);

                /** ZtCommonInfo countryCode */
                countryCode?: (string|null);
            }

            /** Represents a ZtCommonInfo. */
            class ZtCommonInfo implements IZtCommonInfo {

                /**
                 * Constructs a new ZtCommonInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IZtCommonInfo);

                /** ZtCommonInfo kpn. */
                public kpn: string;

                /** ZtCommonInfo kpf. */
                public kpf: string;

                /** ZtCommonInfo subBiz. */
                public subBiz: string;

                /** ZtCommonInfo uid. */
                public uid: (number|Long);

                /** ZtCommonInfo did. */
                public did: string;

                /** ZtCommonInfo clientIp. */
                public clientIp: (number|Long);

                /** ZtCommonInfo appVer. */
                public appVer: string;

                /** ZtCommonInfo ver. */
                public ver: string;

                /** ZtCommonInfo lat. */
                public lat: string;

                /** ZtCommonInfo lon. */
                public lon: string;

                /** ZtCommonInfo mod. */
                public mod: string;

                /** ZtCommonInfo net. */
                public net: string;

                /** ZtCommonInfo sys. */
                public sys: string;

                /** ZtCommonInfo c. */
                public c: string;

                /** ZtCommonInfo language. */
                public language: string;

                /** ZtCommonInfo countryCode. */
                public countryCode: string;

                /**
                 * Creates a new ZtCommonInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ZtCommonInfo instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IZtCommonInfo): AcFunDanmu.Im.Basic.ZtCommonInfo;

                /**
                 * Encodes the specified ZtCommonInfo message. Does not implicitly {@link AcFunDanmu.Im.Basic.ZtCommonInfo.verify|verify} messages.
                 * @param message ZtCommonInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IZtCommonInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ZtCommonInfo message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.ZtCommonInfo.verify|verify} messages.
                 * @param message ZtCommonInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IZtCommonInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ZtCommonInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ZtCommonInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.ZtCommonInfo;

                /**
                 * Decodes a ZtCommonInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ZtCommonInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.ZtCommonInfo;

                /**
                 * Verifies a ZtCommonInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ZtCommonInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ZtCommonInfo
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.ZtCommonInfo;

                /**
                 * Creates a plain object from a ZtCommonInfo message. Also converts values to other types if specified.
                 * @param message ZtCommonInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.ZtCommonInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ZtCommonInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ZtCommonInfo
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a KeepAliveResponse. */
            interface IKeepAliveResponse {

                /** KeepAliveResponse accessPointsConfig */
                accessPointsConfig?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** KeepAliveResponse serverMsec */
                serverMsec?: (number|Long|null);

                /** KeepAliveResponse accessPointsConfigIpv6 */
                accessPointsConfigIpv6?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** KeepAliveResponse accessPointsConfigQuic */
                accessPointsConfigQuic?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** KeepAliveResponse accessPointsConfigQuicIpv6 */
                accessPointsConfigQuicIpv6?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** KeepAliveResponse accessPointsConfigWs */
                accessPointsConfigWs?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);
            }

            /** Represents a KeepAliveResponse. */
            class KeepAliveResponse implements IKeepAliveResponse {

                /**
                 * Constructs a new KeepAliveResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IKeepAliveResponse);

                /** KeepAliveResponse accessPointsConfig. */
                public accessPointsConfig?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** KeepAliveResponse serverMsec. */
                public serverMsec: (number|Long);

                /** KeepAliveResponse accessPointsConfigIpv6. */
                public accessPointsConfigIpv6?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** KeepAliveResponse accessPointsConfigQuic. */
                public accessPointsConfigQuic?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** KeepAliveResponse accessPointsConfigQuicIpv6. */
                public accessPointsConfigQuicIpv6?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** KeepAliveResponse accessPointsConfigWs. */
                public accessPointsConfigWs?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /**
                 * Creates a new KeepAliveResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns KeepAliveResponse instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IKeepAliveResponse): AcFunDanmu.Im.Basic.KeepAliveResponse;

                /**
                 * Encodes the specified KeepAliveResponse message. Does not implicitly {@link AcFunDanmu.Im.Basic.KeepAliveResponse.verify|verify} messages.
                 * @param message KeepAliveResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IKeepAliveResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified KeepAliveResponse message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.KeepAliveResponse.verify|verify} messages.
                 * @param message KeepAliveResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IKeepAliveResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a KeepAliveResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns KeepAliveResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.KeepAliveResponse;

                /**
                 * Decodes a KeepAliveResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns KeepAliveResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.KeepAliveResponse;

                /**
                 * Verifies a KeepAliveResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a KeepAliveResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns KeepAliveResponse
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.KeepAliveResponse;

                /**
                 * Creates a plain object from a KeepAliveResponse message. Also converts values to other types if specified.
                 * @param message KeepAliveResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.KeepAliveResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this KeepAliveResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for KeepAliveResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** LinkErrorCode enum. */
            enum LinkErrorCode {
                SUCC = 0,
                BASIC_MIN = 10000,
                INTERNEL_ERROR = 10001,
                SERVICE_UNAVAILABLE = 10002,
                SERVICE_TIMEOUT = 10003,
                INVALID_TOKEN = 10004,
                REG_ENCYRPT_WITHOUT_TOKEN = 10005,
                PARSE_PB_HDR_FAIL = 10006,
                PARSE_PB_PLD_FAIL = 10007,
                PARSE_PB_FAIL = 10008,
                DECODED_LEN_FAIL = 10009,
                INVALID_KEY = 10010,
                ENCRYPT_FAIL = 10011,
                DECRYPT_FAIL = 10012,
                INVALID_TAG = 10013,
                INVALID_VER = 10014,
                INVALID_COMPRESS_TYPE = 10016,
                INVALID_ENCRYPT_TYPE = 10017,
                NOT_REGISTER = 10018,
                USER_NOT_ONLINE = 10019,
                INVALID_COMMAND = 10020,
                PUSH_UNREGISTER_ERROR = 10021,
                INVALID_SID = 10022,
                INVALID_INSTANCE_ID = 10023,
                CLIENT_LOCALE_NOT_MATCH = 10024,
                INVALID_TOKEN_PASSWORD_CHANGED = 10025,
                INVALID_TOKEN_TOKEN_EXPIRED = 10026,
                INVALID_TOKEN_TOKEN_VALUE_ERROR = 10027,
                INVALID_TOKEN_LOGIN_ON_OTHER_DEVICE = 10028,
                FORCE_RECONNECT = 10029,
                CLIENT_TIMEOUT = 10030,
                INVALID_ARGUMENT = 10031,
                INVALID_FORMAT_TOKEN = 10032,
                EMPTY_PAYLOAD = 10033,
                COMPRESS_FAIL = 10034,
                DECOMPRESS_FAIL = 10035,
                OUT_OF_ORDER = 10036,
                OUT_OF_LIMIT = 10037,
                TOO_LARGE_PAYLOAD = 10038,
                ANONYMOUSE_ERROR = 10039,
                BASIC_MAX = 19999
            }

            /** Properties of a PacketHeader. */
            interface IPacketHeader {

                /** PacketHeader appId */
                appId?: (number|null);

                /** PacketHeader uid */
                uid?: (number|Long|null);

                /** PacketHeader instanceId */
                instanceId?: (number|Long|null);

                /** PacketHeader flags */
                flags?: (number|null);

                /** PacketHeader encodingType */
                encodingType?: (AcFunDanmu.Im.Basic.PacketHeader.EncodingType|null);

                /** PacketHeader decodedPayloadLen */
                decodedPayloadLen?: (number|null);

                /** PacketHeader encryptionMode */
                encryptionMode?: (AcFunDanmu.Im.Basic.PacketHeader.EncryptionMode|null);

                /** PacketHeader tokenInfo */
                tokenInfo?: (AcFunDanmu.Im.Basic.ITokenInfo|null);

                /** PacketHeader seqId */
                seqId?: (number|Long|null);

                /** PacketHeader features */
                features?: (AcFunDanmu.Im.Basic.PacketHeader.Feature[]|null);

                /** PacketHeader kpn */
                kpn?: (string|null);
            }

            /** Represents a PacketHeader. */
            class PacketHeader implements IPacketHeader {

                /**
                 * Constructs a new PacketHeader.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IPacketHeader);

                /** PacketHeader appId. */
                public appId: number;

                /** PacketHeader uid. */
                public uid: (number|Long);

                /** PacketHeader instanceId. */
                public instanceId: (number|Long);

                /** PacketHeader flags. */
                public flags: number;

                /** PacketHeader encodingType. */
                public encodingType: AcFunDanmu.Im.Basic.PacketHeader.EncodingType;

                /** PacketHeader decodedPayloadLen. */
                public decodedPayloadLen: number;

                /** PacketHeader encryptionMode. */
                public encryptionMode: AcFunDanmu.Im.Basic.PacketHeader.EncryptionMode;

                /** PacketHeader tokenInfo. */
                public tokenInfo?: (AcFunDanmu.Im.Basic.ITokenInfo|null);

                /** PacketHeader seqId. */
                public seqId: (number|Long);

                /** PacketHeader features. */
                public features: AcFunDanmu.Im.Basic.PacketHeader.Feature[];

                /** PacketHeader kpn. */
                public kpn: string;

                /**
                 * Creates a new PacketHeader instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PacketHeader instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IPacketHeader): AcFunDanmu.Im.Basic.PacketHeader;

                /**
                 * Encodes the specified PacketHeader message. Does not implicitly {@link AcFunDanmu.Im.Basic.PacketHeader.verify|verify} messages.
                 * @param message PacketHeader message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IPacketHeader, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PacketHeader message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.PacketHeader.verify|verify} messages.
                 * @param message PacketHeader message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IPacketHeader, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PacketHeader message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PacketHeader
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.PacketHeader;

                /**
                 * Decodes a PacketHeader message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PacketHeader
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.PacketHeader;

                /**
                 * Verifies a PacketHeader message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PacketHeader message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PacketHeader
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.PacketHeader;

                /**
                 * Creates a plain object from a PacketHeader message. Also converts values to other types if specified.
                 * @param message PacketHeader
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.PacketHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PacketHeader to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for PacketHeader
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace PacketHeader {

                /** Flags enum. */
                enum Flags {
                    kDirUpstream = 0,
                    kDirDownstream = 1,
                    kDirMask = 1
                }

                /** EncodingType enum. */
                enum EncodingType {
                    kEncodingNone = 0,
                    kEncodingLz4 = 1
                }

                /** EncryptionMode enum. */
                enum EncryptionMode {
                    kEncryptionNone = 0,
                    kEncryptionServiceToken = 1,
                    kEncryptionSessionKey = 2
                }

                /** Feature enum. */
                enum Feature {
                    kReserve = 0,
                    kCompressLz4 = 1
                }
            }

            /** Properties of a TokenInfo. */
            interface ITokenInfo {

                /** TokenInfo tokenType */
                tokenType?: (AcFunDanmu.Im.Basic.TokenInfo.TokenType|null);

                /** TokenInfo token */
                token?: (Uint8Array|null);
            }

            /** Represents a TokenInfo. */
            class TokenInfo implements ITokenInfo {

                /**
                 * Constructs a new TokenInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.ITokenInfo);

                /** TokenInfo tokenType. */
                public tokenType: AcFunDanmu.Im.Basic.TokenInfo.TokenType;

                /** TokenInfo token. */
                public token: Uint8Array;

                /**
                 * Creates a new TokenInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TokenInfo instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.ITokenInfo): AcFunDanmu.Im.Basic.TokenInfo;

                /**
                 * Encodes the specified TokenInfo message. Does not implicitly {@link AcFunDanmu.Im.Basic.TokenInfo.verify|verify} messages.
                 * @param message TokenInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.ITokenInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TokenInfo message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.TokenInfo.verify|verify} messages.
                 * @param message TokenInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.ITokenInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TokenInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TokenInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.TokenInfo;

                /**
                 * Decodes a TokenInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TokenInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.TokenInfo;

                /**
                 * Verifies a TokenInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TokenInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TokenInfo
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.TokenInfo;

                /**
                 * Creates a plain object from a TokenInfo message. Also converts values to other types if specified.
                 * @param message TokenInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.TokenInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TokenInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TokenInfo
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace TokenInfo {

                /** TokenType enum. */
                enum TokenType {
                    kInvalid = 0,
                    kServiceToken = 1
                }
            }

            /** Properties of a PingRequest. */
            interface IPingRequest {

                /** PingRequest pingType */
                pingType?: (AcFunDanmu.Im.Basic.PingRequest.PingType|null);

                /** PingRequest pingRound */
                pingRound?: (number|null);
            }

            /** Represents a PingRequest. */
            class PingRequest implements IPingRequest {

                /**
                 * Constructs a new PingRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IPingRequest);

                /** PingRequest pingType. */
                public pingType: AcFunDanmu.Im.Basic.PingRequest.PingType;

                /** PingRequest pingRound. */
                public pingRound: number;

                /**
                 * Creates a new PingRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PingRequest instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IPingRequest): AcFunDanmu.Im.Basic.PingRequest;

                /**
                 * Encodes the specified PingRequest message. Does not implicitly {@link AcFunDanmu.Im.Basic.PingRequest.verify|verify} messages.
                 * @param message PingRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IPingRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PingRequest message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.PingRequest.verify|verify} messages.
                 * @param message PingRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IPingRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PingRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PingRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.PingRequest;

                /**
                 * Decodes a PingRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PingRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.PingRequest;

                /**
                 * Verifies a PingRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PingRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PingRequest
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.PingRequest;

                /**
                 * Creates a plain object from a PingRequest message. Also converts values to other types if specified.
                 * @param message PingRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.PingRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PingRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for PingRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace PingRequest {

                /** PingType enum. */
                enum PingType {
                    kInvalid = 0,
                    kPriorRegister = 1,
                    kPostRegister = 2
                }
            }

            /** Properties of a PingResponse. */
            interface IPingResponse {

                /** PingResponse serverTimestamp */
                serverTimestamp?: (number|null);

                /** PingResponse clientIp */
                clientIp?: (number|null);

                /** PingResponse redirectIp */
                redirectIp?: (number|null);

                /** PingResponse redirectPort */
                redirectPort?: (number|null);

                /** PingResponse clientIpV6 */
                clientIpV6?: (Uint8Array|null);
            }

            /** Represents a PingResponse. */
            class PingResponse implements IPingResponse {

                /**
                 * Constructs a new PingResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IPingResponse);

                /** PingResponse serverTimestamp. */
                public serverTimestamp: number;

                /** PingResponse clientIp. */
                public clientIp: number;

                /** PingResponse redirectIp. */
                public redirectIp: number;

                /** PingResponse redirectPort. */
                public redirectPort: number;

                /** PingResponse clientIpV6. */
                public clientIpV6: Uint8Array;

                /**
                 * Creates a new PingResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PingResponse instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IPingResponse): AcFunDanmu.Im.Basic.PingResponse;

                /**
                 * Encodes the specified PingResponse message. Does not implicitly {@link AcFunDanmu.Im.Basic.PingResponse.verify|verify} messages.
                 * @param message PingResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IPingResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PingResponse message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.PingResponse.verify|verify} messages.
                 * @param message PingResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IPingResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PingResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PingResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.PingResponse;

                /**
                 * Decodes a PingResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PingResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.PingResponse;

                /**
                 * Verifies a PingResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PingResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PingResponse
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.PingResponse;

                /**
                 * Creates a plain object from a PingResponse message. Also converts values to other types if specified.
                 * @param message PingResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.PingResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PingResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for PingResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a RegisterResponse. */
            interface IRegisterResponse {

                /** RegisterResponse accessPointsConfig */
                accessPointsConfig?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** RegisterResponse sessKey */
                sessKey?: (Uint8Array|null);

                /** RegisterResponse instanceId */
                instanceId?: (number|Long|null);

                /** RegisterResponse sdkOption */
                sdkOption?: (AcFunDanmu.Im.Basic.ISdkOption|null);

                /** RegisterResponse accessPointsConfigIpv6 */
                accessPointsConfigIpv6?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** RegisterResponse accessPointsConfigQuic */
                accessPointsConfigQuic?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** RegisterResponse accessPointsConfigQuicIpv6 */
                accessPointsConfigQuicIpv6?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** RegisterResponse cleanAccessPoint */
                cleanAccessPoint?: (boolean|null);

                /** RegisterResponse accessPointsConfigWs */
                accessPointsConfigWs?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);
            }

            /** Represents a RegisterResponse. */
            class RegisterResponse implements IRegisterResponse {

                /**
                 * Constructs a new RegisterResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IRegisterResponse);

                /** RegisterResponse accessPointsConfig. */
                public accessPointsConfig?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** RegisterResponse sessKey. */
                public sessKey: Uint8Array;

                /** RegisterResponse instanceId. */
                public instanceId: (number|Long);

                /** RegisterResponse sdkOption. */
                public sdkOption?: (AcFunDanmu.Im.Basic.ISdkOption|null);

                /** RegisterResponse accessPointsConfigIpv6. */
                public accessPointsConfigIpv6?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** RegisterResponse accessPointsConfigQuic. */
                public accessPointsConfigQuic?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** RegisterResponse accessPointsConfigQuicIpv6. */
                public accessPointsConfigQuicIpv6?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /** RegisterResponse cleanAccessPoint. */
                public cleanAccessPoint: boolean;

                /** RegisterResponse accessPointsConfigWs. */
                public accessPointsConfigWs?: (AcFunDanmu.Im.Basic.IAccessPointsConfig|null);

                /**
                 * Creates a new RegisterResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RegisterResponse instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IRegisterResponse): AcFunDanmu.Im.Basic.RegisterResponse;

                /**
                 * Encodes the specified RegisterResponse message. Does not implicitly {@link AcFunDanmu.Im.Basic.RegisterResponse.verify|verify} messages.
                 * @param message RegisterResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IRegisterResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RegisterResponse message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.RegisterResponse.verify|verify} messages.
                 * @param message RegisterResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IRegisterResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RegisterResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RegisterResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.RegisterResponse;

                /**
                 * Decodes a RegisterResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RegisterResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.RegisterResponse;

                /**
                 * Verifies a RegisterResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RegisterResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RegisterResponse
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.RegisterResponse;

                /**
                 * Creates a plain object from a RegisterResponse message. Also converts values to other types if specified.
                 * @param message RegisterResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.RegisterResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RegisterResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for RegisterResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a SdkOption. */
            interface ISdkOption {

                /** SdkOption reportIntervalSeconds */
                reportIntervalSeconds?: (number|null);

                /** SdkOption reportSecurity */
                reportSecurity?: (string|null);

                /** SdkOption lz4CompressionThresholdBytes */
                lz4CompressionThresholdBytes?: (number|null);

                /** SdkOption netCheckServers */
                netCheckServers?: (string[]|null);
            }

            /** Represents a SdkOption. */
            class SdkOption implements ISdkOption {

                /**
                 * Constructs a new SdkOption.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.ISdkOption);

                /** SdkOption reportIntervalSeconds. */
                public reportIntervalSeconds: number;

                /** SdkOption reportSecurity. */
                public reportSecurity: string;

                /** SdkOption lz4CompressionThresholdBytes. */
                public lz4CompressionThresholdBytes: number;

                /** SdkOption netCheckServers. */
                public netCheckServers: string[];

                /**
                 * Creates a new SdkOption instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SdkOption instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.ISdkOption): AcFunDanmu.Im.Basic.SdkOption;

                /**
                 * Encodes the specified SdkOption message. Does not implicitly {@link AcFunDanmu.Im.Basic.SdkOption.verify|verify} messages.
                 * @param message SdkOption message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.ISdkOption, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SdkOption message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.SdkOption.verify|verify} messages.
                 * @param message SdkOption message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.ISdkOption, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SdkOption message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SdkOption
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.SdkOption;

                /**
                 * Decodes a SdkOption message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SdkOption
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.SdkOption;

                /**
                 * Verifies a SdkOption message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SdkOption message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SdkOption
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.SdkOption;

                /**
                 * Creates a plain object from a SdkOption message. Also converts values to other types if specified.
                 * @param message SdkOption
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.SdkOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SdkOption to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for SdkOption
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a RequsetBasicInfo. */
            interface IRequsetBasicInfo {

                /** RequsetBasicInfo clientType */
                clientType?: (AcFunDanmu.Im.Basic.DeviceInfo.PlatformType|null);

                /** RequsetBasicInfo deviceId */
                deviceId?: (string|null);

                /** RequsetBasicInfo clientIp */
                clientIp?: (string|null);

                /** RequsetBasicInfo appVersion */
                appVersion?: (string|null);

                /** RequsetBasicInfo channel */
                channel?: (string|null);

                /** RequsetBasicInfo appInfo */
                appInfo?: (AcFunDanmu.Im.Basic.IAppInfo|null);

                /** RequsetBasicInfo deviceInfo */
                deviceInfo?: (AcFunDanmu.Im.Basic.IDeviceInfo|null);

                /** RequsetBasicInfo envInfo */
                envInfo?: (AcFunDanmu.Im.Basic.IEnvInfo|null);

                /** RequsetBasicInfo clientPort */
                clientPort?: (number|null);

                /** RequsetBasicInfo location */
                location?: (string|null);

                /** RequsetBasicInfo kpf */
                kpf?: (string|null);

                /** RequsetBasicInfo clientIpV6 */
                clientIpV6?: (string|null);
            }

            /** Represents a RequsetBasicInfo. */
            class RequsetBasicInfo implements IRequsetBasicInfo {

                /**
                 * Constructs a new RequsetBasicInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IRequsetBasicInfo);

                /** RequsetBasicInfo clientType. */
                public clientType: AcFunDanmu.Im.Basic.DeviceInfo.PlatformType;

                /** RequsetBasicInfo deviceId. */
                public deviceId: string;

                /** RequsetBasicInfo clientIp. */
                public clientIp: string;

                /** RequsetBasicInfo appVersion. */
                public appVersion: string;

                /** RequsetBasicInfo channel. */
                public channel: string;

                /** RequsetBasicInfo appInfo. */
                public appInfo?: (AcFunDanmu.Im.Basic.IAppInfo|null);

                /** RequsetBasicInfo deviceInfo. */
                public deviceInfo?: (AcFunDanmu.Im.Basic.IDeviceInfo|null);

                /** RequsetBasicInfo envInfo. */
                public envInfo?: (AcFunDanmu.Im.Basic.IEnvInfo|null);

                /** RequsetBasicInfo clientPort. */
                public clientPort: number;

                /** RequsetBasicInfo location. */
                public location: string;

                /** RequsetBasicInfo kpf. */
                public kpf: string;

                /** RequsetBasicInfo clientIpV6. */
                public clientIpV6: string;

                /**
                 * Creates a new RequsetBasicInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RequsetBasicInfo instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IRequsetBasicInfo): AcFunDanmu.Im.Basic.RequsetBasicInfo;

                /**
                 * Encodes the specified RequsetBasicInfo message. Does not implicitly {@link AcFunDanmu.Im.Basic.RequsetBasicInfo.verify|verify} messages.
                 * @param message RequsetBasicInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IRequsetBasicInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RequsetBasicInfo message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.RequsetBasicInfo.verify|verify} messages.
                 * @param message RequsetBasicInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IRequsetBasicInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RequsetBasicInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RequsetBasicInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.RequsetBasicInfo;

                /**
                 * Decodes a RequsetBasicInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RequsetBasicInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.RequsetBasicInfo;

                /**
                 * Verifies a RequsetBasicInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RequsetBasicInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RequsetBasicInfo
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.RequsetBasicInfo;

                /**
                 * Creates a plain object from a RequsetBasicInfo message. Also converts values to other types if specified.
                 * @param message RequsetBasicInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.RequsetBasicInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RequsetBasicInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for RequsetBasicInfo
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a SettingInfo. */
            interface ISettingInfo {

                /** SettingInfo locale */
                locale?: (string|null);

                /** SettingInfo timezone */
                timezone?: (number|null);
            }

            /** Represents a SettingInfo. */
            class SettingInfo implements ISettingInfo {

                /**
                 * Constructs a new SettingInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.ISettingInfo);

                /** SettingInfo locale. */
                public locale: string;

                /** SettingInfo timezone. */
                public timezone: number;

                /**
                 * Creates a new SettingInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SettingInfo instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.ISettingInfo): AcFunDanmu.Im.Basic.SettingInfo;

                /**
                 * Encodes the specified SettingInfo message. Does not implicitly {@link AcFunDanmu.Im.Basic.SettingInfo.verify|verify} messages.
                 * @param message SettingInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.ISettingInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SettingInfo message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.SettingInfo.verify|verify} messages.
                 * @param message SettingInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.ISettingInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SettingInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SettingInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.SettingInfo;

                /**
                 * Decodes a SettingInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SettingInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.SettingInfo;

                /**
                 * Verifies a SettingInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SettingInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SettingInfo
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.SettingInfo;

                /**
                 * Creates a plain object from a SettingInfo message. Also converts values to other types if specified.
                 * @param message SettingInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.SettingInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SettingInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for SettingInfo
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** SharePlatform enum. */
            enum SharePlatform {
                kSharePlatformInvalid = 0,
                kSharePlatformWechat = 1,
                kSharePlatformWechatMoments = 2,
                kSharePlatformQQ = 3,
                kSharePlatformQzone = 4,
                kSharePlatformWeibo = 5,
                kSharePlatformKuaishou = 6,
                kSharePlatformFacebook = 7,
                kSharePlatformTwitter = 8,
                kSharePlatformGoogle = 9,
                kSharePlatformKakao = 10,
                kSharePlatformZalo = 11
            }

            /** Properties of a SyncCookie. */
            interface ISyncCookie {

                /** SyncCookie syncOffset */
                syncOffset?: (number|Long|null);
            }

            /** Represents a SyncCookie. */
            class SyncCookie implements ISyncCookie {

                /**
                 * Constructs a new SyncCookie.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.ISyncCookie);

                /** SyncCookie syncOffset. */
                public syncOffset: (number|Long);

                /**
                 * Creates a new SyncCookie instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SyncCookie instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.ISyncCookie): AcFunDanmu.Im.Basic.SyncCookie;

                /**
                 * Encodes the specified SyncCookie message. Does not implicitly {@link AcFunDanmu.Im.Basic.SyncCookie.verify|verify} messages.
                 * @param message SyncCookie message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.ISyncCookie, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SyncCookie message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.SyncCookie.verify|verify} messages.
                 * @param message SyncCookie message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.ISyncCookie, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SyncCookie message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SyncCookie
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.SyncCookie;

                /**
                 * Decodes a SyncCookie message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SyncCookie
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.SyncCookie;

                /**
                 * Verifies a SyncCookie message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SyncCookie message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SyncCookie
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.SyncCookie;

                /**
                 * Creates a plain object from a SyncCookie message. Also converts values to other types if specified.
                 * @param message SyncCookie
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.SyncCookie, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SyncCookie to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for SyncCookie
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an UnregisterRequest. */
            interface IUnregisterRequest {
            }

            /** Represents an UnregisterRequest. */
            class UnregisterRequest implements IUnregisterRequest {

                /**
                 * Constructs a new UnregisterRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IUnregisterRequest);

                /**
                 * Creates a new UnregisterRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns UnregisterRequest instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IUnregisterRequest): AcFunDanmu.Im.Basic.UnregisterRequest;

                /**
                 * Encodes the specified UnregisterRequest message. Does not implicitly {@link AcFunDanmu.Im.Basic.UnregisterRequest.verify|verify} messages.
                 * @param message UnregisterRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IUnregisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified UnregisterRequest message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.UnregisterRequest.verify|verify} messages.
                 * @param message UnregisterRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IUnregisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an UnregisterRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns UnregisterRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.UnregisterRequest;

                /**
                 * Decodes an UnregisterRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns UnregisterRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.UnregisterRequest;

                /**
                 * Verifies an UnregisterRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an UnregisterRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns UnregisterRequest
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.UnregisterRequest;

                /**
                 * Creates a plain object from an UnregisterRequest message. Also converts values to other types if specified.
                 * @param message UnregisterRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.UnregisterRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this UnregisterRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for UnregisterRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an UnregisterResponse. */
            interface IUnregisterResponse {
            }

            /** Represents an UnregisterResponse. */
            class UnregisterResponse implements IUnregisterResponse {

                /**
                 * Constructs a new UnregisterResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IUnregisterResponse);

                /**
                 * Creates a new UnregisterResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns UnregisterResponse instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IUnregisterResponse): AcFunDanmu.Im.Basic.UnregisterResponse;

                /**
                 * Encodes the specified UnregisterResponse message. Does not implicitly {@link AcFunDanmu.Im.Basic.UnregisterResponse.verify|verify} messages.
                 * @param message UnregisterResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IUnregisterResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified UnregisterResponse message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.UnregisterResponse.verify|verify} messages.
                 * @param message UnregisterResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IUnregisterResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an UnregisterResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns UnregisterResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.UnregisterResponse;

                /**
                 * Decodes an UnregisterResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns UnregisterResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.UnregisterResponse;

                /**
                 * Verifies an UnregisterResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an UnregisterResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns UnregisterResponse
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.UnregisterResponse;

                /**
                 * Creates a plain object from an UnregisterResponse message. Also converts values to other types if specified.
                 * @param message UnregisterResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.UnregisterResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this UnregisterResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for UnregisterResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an UpstreamPayload. */
            interface IUpstreamPayload {

                /** UpstreamPayload command */
                command?: (string|null);

                /** UpstreamPayload seqId */
                seqId?: (number|Long|null);

                /** UpstreamPayload retryCount */
                retryCount?: (number|null);

                /** UpstreamPayload payloadData */
                payloadData?: (Uint8Array|null);

                /** UpstreamPayload userInstance */
                userInstance?: (AcFunDanmu.Im.Basic.IUserInstance|null);

                /** UpstreamPayload errorCode */
                errorCode?: (number|null);

                /** UpstreamPayload settingInfo */
                settingInfo?: (AcFunDanmu.Im.Basic.ISettingInfo|null);

                /** UpstreamPayload requestBasicInfo */
                requestBasicInfo?: (AcFunDanmu.Im.Basic.IRequsetBasicInfo|null);

                /** UpstreamPayload subBiz */
                subBiz?: (string|null);

                /** UpstreamPayload frontendInfo */
                frontendInfo?: (AcFunDanmu.Im.Basic.IFrontendInfo|null);

                /** UpstreamPayload kpn */
                kpn?: (string|null);

                /** UpstreamPayload anonymouseUser */
                anonymouseUser?: (boolean|null);

                /** UpstreamPayload laneId */
                laneId?: (string|null);
            }

            /** Represents an UpstreamPayload. */
            class UpstreamPayload implements IUpstreamPayload {

                /**
                 * Constructs a new UpstreamPayload.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IUpstreamPayload);

                /** UpstreamPayload command. */
                public command: string;

                /** UpstreamPayload seqId. */
                public seqId: (number|Long);

                /** UpstreamPayload retryCount. */
                public retryCount: number;

                /** UpstreamPayload payloadData. */
                public payloadData: Uint8Array;

                /** UpstreamPayload userInstance. */
                public userInstance?: (AcFunDanmu.Im.Basic.IUserInstance|null);

                /** UpstreamPayload errorCode. */
                public errorCode: number;

                /** UpstreamPayload settingInfo. */
                public settingInfo?: (AcFunDanmu.Im.Basic.ISettingInfo|null);

                /** UpstreamPayload requestBasicInfo. */
                public requestBasicInfo?: (AcFunDanmu.Im.Basic.IRequsetBasicInfo|null);

                /** UpstreamPayload subBiz. */
                public subBiz: string;

                /** UpstreamPayload frontendInfo. */
                public frontendInfo?: (AcFunDanmu.Im.Basic.IFrontendInfo|null);

                /** UpstreamPayload kpn. */
                public kpn: string;

                /** UpstreamPayload anonymouseUser. */
                public anonymouseUser: boolean;

                /** UpstreamPayload laneId. */
                public laneId: string;

                /**
                 * Creates a new UpstreamPayload instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns UpstreamPayload instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IUpstreamPayload): AcFunDanmu.Im.Basic.UpstreamPayload;

                /**
                 * Encodes the specified UpstreamPayload message. Does not implicitly {@link AcFunDanmu.Im.Basic.UpstreamPayload.verify|verify} messages.
                 * @param message UpstreamPayload message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IUpstreamPayload, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified UpstreamPayload message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.UpstreamPayload.verify|verify} messages.
                 * @param message UpstreamPayload message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IUpstreamPayload, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an UpstreamPayload message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns UpstreamPayload
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.UpstreamPayload;

                /**
                 * Decodes an UpstreamPayload message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns UpstreamPayload
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.UpstreamPayload;

                /**
                 * Verifies an UpstreamPayload message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an UpstreamPayload message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns UpstreamPayload
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.UpstreamPayload;

                /**
                 * Creates a plain object from an UpstreamPayload message. Also converts values to other types if specified.
                 * @param message UpstreamPayload
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.UpstreamPayload, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this UpstreamPayload to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for UpstreamPayload
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a UserInstance. */
            interface IUserInstance {

                /** UserInstance user */
                user?: (AcFunDanmu.Im.Basic.IUser|null);

                /** UserInstance instanceId */
                instanceId?: (number|Long|null);
            }

            /** Represents a UserInstance. */
            class UserInstance implements IUserInstance {

                /**
                 * Constructs a new UserInstance.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IUserInstance);

                /** UserInstance user. */
                public user?: (AcFunDanmu.Im.Basic.IUser|null);

                /** UserInstance instanceId. */
                public instanceId: (number|Long);

                /**
                 * Creates a new UserInstance instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns UserInstance instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IUserInstance): AcFunDanmu.Im.Basic.UserInstance;

                /**
                 * Encodes the specified UserInstance message. Does not implicitly {@link AcFunDanmu.Im.Basic.UserInstance.verify|verify} messages.
                 * @param message UserInstance message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IUserInstance, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified UserInstance message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.UserInstance.verify|verify} messages.
                 * @param message UserInstance message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IUserInstance, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a UserInstance message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns UserInstance
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.UserInstance;

                /**
                 * Decodes a UserInstance message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns UserInstance
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.UserInstance;

                /**
                 * Verifies a UserInstance message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a UserInstance message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns UserInstance
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.UserInstance;

                /**
                 * Creates a plain object from a UserInstance message. Also converts values to other types if specified.
                 * @param message UserInstance
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.UserInstance, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this UserInstance to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for UserInstance
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a User. */
            interface IUser {

                /** User appId */
                appId?: (number|null);

                /** User uid */
                uid?: (number|Long|null);
            }

            /** Represents a User. */
            class User implements IUser {

                /**
                 * Constructs a new User.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AcFunDanmu.Im.Basic.IUser);

                /** User appId. */
                public appId: number;

                /** User uid. */
                public uid: (number|Long);

                /**
                 * Creates a new User instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns User instance
                 */
                public static create(properties?: AcFunDanmu.Im.Basic.IUser): AcFunDanmu.Im.Basic.User;

                /**
                 * Encodes the specified User message. Does not implicitly {@link AcFunDanmu.Im.Basic.User.verify|verify} messages.
                 * @param message User message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AcFunDanmu.Im.Basic.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified User message, length delimited. Does not implicitly {@link AcFunDanmu.Im.Basic.User.verify|verify} messages.
                 * @param message User message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AcFunDanmu.Im.Basic.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a User message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns User
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Im.Basic.User;

                /**
                 * Decodes a User message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns User
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Im.Basic.User;

                /**
                 * Verifies a User message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a User message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns User
                 */
                public static fromObject(object: { [k: string]: any }): AcFunDanmu.Im.Basic.User;

                /**
                 * Creates a plain object from a User message. Also converts values to other types if specified.
                 * @param message User
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AcFunDanmu.Im.Basic.User, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this User to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for User
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }
    }

    /** Properties of an AcFunUserInfo. */
    interface IAcFunUserInfo {

        /** AcFunUserInfo userId */
        userId?: (number|Long|null);

        /** AcFunUserInfo name */
        name?: (string|null);
    }

    /** Represents an AcFunUserInfo. */
    class AcFunUserInfo implements IAcFunUserInfo {

        /**
         * Constructs a new AcFunUserInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IAcFunUserInfo);

        /** AcFunUserInfo userId. */
        public userId: (number|Long);

        /** AcFunUserInfo name. */
        public name: string;

        /**
         * Creates a new AcFunUserInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AcFunUserInfo instance
         */
        public static create(properties?: AcFunDanmu.IAcFunUserInfo): AcFunDanmu.AcFunUserInfo;

        /**
         * Encodes the specified AcFunUserInfo message. Does not implicitly {@link AcFunDanmu.AcFunUserInfo.verify|verify} messages.
         * @param message AcFunUserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IAcFunUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AcFunUserInfo message, length delimited. Does not implicitly {@link AcFunDanmu.AcFunUserInfo.verify|verify} messages.
         * @param message AcFunUserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IAcFunUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AcFunUserInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AcFunUserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.AcFunUserInfo;

        /**
         * Decodes an AcFunUserInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AcFunUserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.AcFunUserInfo;

        /**
         * Verifies an AcFunUserInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AcFunUserInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AcFunUserInfo
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.AcFunUserInfo;

        /**
         * Creates a plain object from an AcFunUserInfo message. Also converts values to other types if specified.
         * @param message AcFunUserInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.AcFunUserInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AcFunUserInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AcFunUserInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AcfunActionSignalThrowBanana. */
    interface IAcfunActionSignalThrowBanana {

        /** AcfunActionSignalThrowBanana visitor */
        visitor?: (AcFunDanmu.IAcFunUserInfo|null);

        /** AcfunActionSignalThrowBanana count */
        count?: (number|null);

        /** AcfunActionSignalThrowBanana sendTimeMs */
        sendTimeMs?: (number|Long|null);
    }

    /** Represents an AcfunActionSignalThrowBanana. */
    class AcfunActionSignalThrowBanana implements IAcfunActionSignalThrowBanana {

        /**
         * Constructs a new AcfunActionSignalThrowBanana.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IAcfunActionSignalThrowBanana);

        /** AcfunActionSignalThrowBanana visitor. */
        public visitor?: (AcFunDanmu.IAcFunUserInfo|null);

        /** AcfunActionSignalThrowBanana count. */
        public count: number;

        /** AcfunActionSignalThrowBanana sendTimeMs. */
        public sendTimeMs: (number|Long);

        /**
         * Creates a new AcfunActionSignalThrowBanana instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AcfunActionSignalThrowBanana instance
         */
        public static create(properties?: AcFunDanmu.IAcfunActionSignalThrowBanana): AcFunDanmu.AcfunActionSignalThrowBanana;

        /**
         * Encodes the specified AcfunActionSignalThrowBanana message. Does not implicitly {@link AcFunDanmu.AcfunActionSignalThrowBanana.verify|verify} messages.
         * @param message AcfunActionSignalThrowBanana message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IAcfunActionSignalThrowBanana, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AcfunActionSignalThrowBanana message, length delimited. Does not implicitly {@link AcFunDanmu.AcfunActionSignalThrowBanana.verify|verify} messages.
         * @param message AcfunActionSignalThrowBanana message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IAcfunActionSignalThrowBanana, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AcfunActionSignalThrowBanana message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AcfunActionSignalThrowBanana
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.AcfunActionSignalThrowBanana;

        /**
         * Decodes an AcfunActionSignalThrowBanana message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AcfunActionSignalThrowBanana
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.AcfunActionSignalThrowBanana;

        /**
         * Verifies an AcfunActionSignalThrowBanana message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AcfunActionSignalThrowBanana message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AcfunActionSignalThrowBanana
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.AcfunActionSignalThrowBanana;

        /**
         * Creates a plain object from an AcfunActionSignalThrowBanana message. Also converts values to other types if specified.
         * @param message AcfunActionSignalThrowBanana
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.AcfunActionSignalThrowBanana, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AcfunActionSignalThrowBanana to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AcfunActionSignalThrowBanana
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AcfunStateSignalDisplayInfo. */
    interface IAcfunStateSignalDisplayInfo {

        /** AcfunStateSignalDisplayInfo bananaCount */
        bananaCount?: (string|null);
    }

    /** Represents an AcfunStateSignalDisplayInfo. */
    class AcfunStateSignalDisplayInfo implements IAcfunStateSignalDisplayInfo {

        /**
         * Constructs a new AcfunStateSignalDisplayInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IAcfunStateSignalDisplayInfo);

        /** AcfunStateSignalDisplayInfo bananaCount. */
        public bananaCount: string;

        /**
         * Creates a new AcfunStateSignalDisplayInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AcfunStateSignalDisplayInfo instance
         */
        public static create(properties?: AcFunDanmu.IAcfunStateSignalDisplayInfo): AcFunDanmu.AcfunStateSignalDisplayInfo;

        /**
         * Encodes the specified AcfunStateSignalDisplayInfo message. Does not implicitly {@link AcFunDanmu.AcfunStateSignalDisplayInfo.verify|verify} messages.
         * @param message AcfunStateSignalDisplayInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IAcfunStateSignalDisplayInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AcfunStateSignalDisplayInfo message, length delimited. Does not implicitly {@link AcFunDanmu.AcfunStateSignalDisplayInfo.verify|verify} messages.
         * @param message AcfunStateSignalDisplayInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IAcfunStateSignalDisplayInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AcfunStateSignalDisplayInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AcfunStateSignalDisplayInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.AcfunStateSignalDisplayInfo;

        /**
         * Decodes an AcfunStateSignalDisplayInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AcfunStateSignalDisplayInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.AcfunStateSignalDisplayInfo;

        /**
         * Verifies an AcfunStateSignalDisplayInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AcfunStateSignalDisplayInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AcfunStateSignalDisplayInfo
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.AcfunStateSignalDisplayInfo;

        /**
         * Creates a plain object from an AcfunStateSignalDisplayInfo message. Also converts values to other types if specified.
         * @param message AcfunStateSignalDisplayInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.AcfunStateSignalDisplayInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AcfunStateSignalDisplayInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AcfunStateSignalDisplayInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AcfunActionSignalJoinClub. */
    interface IAcfunActionSignalJoinClub {

        /** AcfunActionSignalJoinClub fansInfo */
        fansInfo?: (AcFunDanmu.IAcFunUserInfo|null);

        /** AcfunActionSignalJoinClub uperInfo */
        uperInfo?: (AcFunDanmu.IAcFunUserInfo|null);

        /** AcfunActionSignalJoinClub joinTimeMs */
        joinTimeMs?: (number|Long|null);
    }

    /** Represents an AcfunActionSignalJoinClub. */
    class AcfunActionSignalJoinClub implements IAcfunActionSignalJoinClub {

        /**
         * Constructs a new AcfunActionSignalJoinClub.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IAcfunActionSignalJoinClub);

        /** AcfunActionSignalJoinClub fansInfo. */
        public fansInfo?: (AcFunDanmu.IAcFunUserInfo|null);

        /** AcfunActionSignalJoinClub uperInfo. */
        public uperInfo?: (AcFunDanmu.IAcFunUserInfo|null);

        /** AcfunActionSignalJoinClub joinTimeMs. */
        public joinTimeMs: (number|Long);

        /**
         * Creates a new AcfunActionSignalJoinClub instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AcfunActionSignalJoinClub instance
         */
        public static create(properties?: AcFunDanmu.IAcfunActionSignalJoinClub): AcFunDanmu.AcfunActionSignalJoinClub;

        /**
         * Encodes the specified AcfunActionSignalJoinClub message. Does not implicitly {@link AcFunDanmu.AcfunActionSignalJoinClub.verify|verify} messages.
         * @param message AcfunActionSignalJoinClub message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IAcfunActionSignalJoinClub, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AcfunActionSignalJoinClub message, length delimited. Does not implicitly {@link AcFunDanmu.AcfunActionSignalJoinClub.verify|verify} messages.
         * @param message AcfunActionSignalJoinClub message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IAcfunActionSignalJoinClub, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AcfunActionSignalJoinClub message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AcfunActionSignalJoinClub
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.AcfunActionSignalJoinClub;

        /**
         * Decodes an AcfunActionSignalJoinClub message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AcfunActionSignalJoinClub
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.AcfunActionSignalJoinClub;

        /**
         * Verifies an AcfunActionSignalJoinClub message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AcfunActionSignalJoinClub message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AcfunActionSignalJoinClub
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.AcfunActionSignalJoinClub;

        /**
         * Creates a plain object from an AcfunActionSignalJoinClub message. Also converts values to other types if specified.
         * @param message AcfunActionSignalJoinClub
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.AcfunActionSignalJoinClub, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AcfunActionSignalJoinClub to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AcfunActionSignalJoinClub
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AuthorChatPlayerInfo. */
    interface IAuthorChatPlayerInfo {

        /** AuthorChatPlayerInfo player */
        player?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** AuthorChatPlayerInfo liveId */
        liveId?: (string|null);

        /** AuthorChatPlayerInfo enableJumpPeerLiveRoom */
        enableJumpPeerLiveRoom?: (boolean|null);
    }

    /** Represents an AuthorChatPlayerInfo. */
    class AuthorChatPlayerInfo implements IAuthorChatPlayerInfo {

        /**
         * Constructs a new AuthorChatPlayerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IAuthorChatPlayerInfo);

        /** AuthorChatPlayerInfo player. */
        public player?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** AuthorChatPlayerInfo liveId. */
        public liveId: string;

        /** AuthorChatPlayerInfo enableJumpPeerLiveRoom. */
        public enableJumpPeerLiveRoom: boolean;

        /**
         * Creates a new AuthorChatPlayerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AuthorChatPlayerInfo instance
         */
        public static create(properties?: AcFunDanmu.IAuthorChatPlayerInfo): AcFunDanmu.AuthorChatPlayerInfo;

        /**
         * Encodes the specified AuthorChatPlayerInfo message. Does not implicitly {@link AcFunDanmu.AuthorChatPlayerInfo.verify|verify} messages.
         * @param message AuthorChatPlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IAuthorChatPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AuthorChatPlayerInfo message, length delimited. Does not implicitly {@link AcFunDanmu.AuthorChatPlayerInfo.verify|verify} messages.
         * @param message AuthorChatPlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IAuthorChatPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AuthorChatPlayerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AuthorChatPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.AuthorChatPlayerInfo;

        /**
         * Decodes an AuthorChatPlayerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AuthorChatPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.AuthorChatPlayerInfo;

        /**
         * Verifies an AuthorChatPlayerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AuthorChatPlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AuthorChatPlayerInfo
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.AuthorChatPlayerInfo;

        /**
         * Creates a plain object from an AuthorChatPlayerInfo message. Also converts values to other types if specified.
         * @param message AuthorChatPlayerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.AuthorChatPlayerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AuthorChatPlayerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AuthorChatPlayerInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveUserInfo. */
    interface IZtLiveUserInfo {

        /** ZtLiveUserInfo userId */
        userId?: (number|Long|null);

        /** ZtLiveUserInfo nickname */
        nickname?: (string|null);

        /** ZtLiveUserInfo avatar */
        avatar?: (AcFunDanmu.IImageCdnNode[]|null);

        /** ZtLiveUserInfo badge */
        badge?: (string|null);

        /** ZtLiveUserInfo userIdentity */
        userIdentity?: (AcFunDanmu.IZtLiveUserIdentity|null);

        /** ZtLiveUserInfo f */
        f?: (boolean|null);

        /** ZtLiveUserInfo g */
        g?: (string|null);
    }

    /** Represents a ZtLiveUserInfo. */
    class ZtLiveUserInfo implements IZtLiveUserInfo {

        /**
         * Constructs a new ZtLiveUserInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveUserInfo);

        /** ZtLiveUserInfo userId. */
        public userId: (number|Long);

        /** ZtLiveUserInfo nickname. */
        public nickname: string;

        /** ZtLiveUserInfo avatar. */
        public avatar: AcFunDanmu.IImageCdnNode[];

        /** ZtLiveUserInfo badge. */
        public badge: string;

        /** ZtLiveUserInfo userIdentity. */
        public userIdentity?: (AcFunDanmu.IZtLiveUserIdentity|null);

        /** ZtLiveUserInfo f. */
        public f: boolean;

        /** ZtLiveUserInfo g. */
        public g: string;

        /**
         * Creates a new ZtLiveUserInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveUserInfo instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveUserInfo): AcFunDanmu.ZtLiveUserInfo;

        /**
         * Encodes the specified ZtLiveUserInfo message. Does not implicitly {@link AcFunDanmu.ZtLiveUserInfo.verify|verify} messages.
         * @param message ZtLiveUserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveUserInfo message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveUserInfo.verify|verify} messages.
         * @param message ZtLiveUserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveUserInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveUserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveUserInfo;

        /**
         * Decodes a ZtLiveUserInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveUserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveUserInfo;

        /**
         * Verifies a ZtLiveUserInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveUserInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveUserInfo
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveUserInfo;

        /**
         * Creates a plain object from a ZtLiveUserInfo message. Also converts values to other types if specified.
         * @param message ZtLiveUserInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveUserInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveUserInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveUserInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an ImageCdnNode. */
    interface IImageCdnNode {

        /** ImageCdnNode cdn */
        cdn?: (string|null);

        /** ImageCdnNode url */
        url?: (string|null);

        /** ImageCdnNode urlPattern */
        urlPattern?: (string|null);
    }

    /** Represents an ImageCdnNode. */
    class ImageCdnNode implements IImageCdnNode {

        /**
         * Constructs a new ImageCdnNode.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IImageCdnNode);

        /** ImageCdnNode cdn. */
        public cdn: string;

        /** ImageCdnNode url. */
        public url: string;

        /** ImageCdnNode urlPattern. */
        public urlPattern: string;

        /**
         * Creates a new ImageCdnNode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ImageCdnNode instance
         */
        public static create(properties?: AcFunDanmu.IImageCdnNode): AcFunDanmu.ImageCdnNode;

        /**
         * Encodes the specified ImageCdnNode message. Does not implicitly {@link AcFunDanmu.ImageCdnNode.verify|verify} messages.
         * @param message ImageCdnNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IImageCdnNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ImageCdnNode message, length delimited. Does not implicitly {@link AcFunDanmu.ImageCdnNode.verify|verify} messages.
         * @param message ImageCdnNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IImageCdnNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ImageCdnNode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ImageCdnNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ImageCdnNode;

        /**
         * Decodes an ImageCdnNode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ImageCdnNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ImageCdnNode;

        /**
         * Verifies an ImageCdnNode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ImageCdnNode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ImageCdnNode
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ImageCdnNode;

        /**
         * Creates a plain object from an ImageCdnNode message. Also converts values to other types if specified.
         * @param message ImageCdnNode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ImageCdnNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ImageCdnNode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ImageCdnNode
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveUserIdentity. */
    interface IZtLiveUserIdentity {

        /** ZtLiveUserIdentity managerType */
        managerType?: (AcFunDanmu.ZtLiveUserIdentity.ManagerType|null);
    }

    /** Represents a ZtLiveUserIdentity. */
    class ZtLiveUserIdentity implements IZtLiveUserIdentity {

        /**
         * Constructs a new ZtLiveUserIdentity.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveUserIdentity);

        /** ZtLiveUserIdentity managerType. */
        public managerType: AcFunDanmu.ZtLiveUserIdentity.ManagerType;

        /**
         * Creates a new ZtLiveUserIdentity instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveUserIdentity instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveUserIdentity): AcFunDanmu.ZtLiveUserIdentity;

        /**
         * Encodes the specified ZtLiveUserIdentity message. Does not implicitly {@link AcFunDanmu.ZtLiveUserIdentity.verify|verify} messages.
         * @param message ZtLiveUserIdentity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveUserIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveUserIdentity message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveUserIdentity.verify|verify} messages.
         * @param message ZtLiveUserIdentity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveUserIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveUserIdentity message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveUserIdentity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveUserIdentity;

        /**
         * Decodes a ZtLiveUserIdentity message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveUserIdentity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveUserIdentity;

        /**
         * Verifies a ZtLiveUserIdentity message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveUserIdentity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveUserIdentity
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveUserIdentity;

        /**
         * Creates a plain object from a ZtLiveUserIdentity message. Also converts values to other types if specified.
         * @param message ZtLiveUserIdentity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveUserIdentity, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveUserIdentity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveUserIdentity
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace ZtLiveUserIdentity {

        /** ManagerType enum. */
        enum ManagerType {
            UNKNOWN_MANAGER_TYPE = 0,
            NORMAL = 1
        }
    }

    /** Properties of a BackgroundStyle. */
    interface IBackgroundStyle {

        /** BackgroundStyle a */
        a?: (string|null);

        /** BackgroundStyle b */
        b?: (AcFunDanmu.IImageCdnNode[]|null);
    }

    /** Represents a BackgroundStyle. */
    class BackgroundStyle implements IBackgroundStyle {

        /**
         * Constructs a new BackgroundStyle.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IBackgroundStyle);

        /** BackgroundStyle a. */
        public a: string;

        /** BackgroundStyle b. */
        public b: AcFunDanmu.IImageCdnNode[];

        /**
         * Creates a new BackgroundStyle instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackgroundStyle instance
         */
        public static create(properties?: AcFunDanmu.IBackgroundStyle): AcFunDanmu.BackgroundStyle;

        /**
         * Encodes the specified BackgroundStyle message. Does not implicitly {@link AcFunDanmu.BackgroundStyle.verify|verify} messages.
         * @param message BackgroundStyle message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IBackgroundStyle, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackgroundStyle message, length delimited. Does not implicitly {@link AcFunDanmu.BackgroundStyle.verify|verify} messages.
         * @param message BackgroundStyle message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IBackgroundStyle, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackgroundStyle message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackgroundStyle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.BackgroundStyle;

        /**
         * Decodes a BackgroundStyle message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackgroundStyle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.BackgroundStyle;

        /**
         * Verifies a BackgroundStyle message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackgroundStyle message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackgroundStyle
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.BackgroundStyle;

        /**
         * Creates a plain object from a BackgroundStyle message. Also converts values to other types if specified.
         * @param message BackgroundStyle
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.BackgroundStyle, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackgroundStyle to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BackgroundStyle
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BackgroundStyle {

        /** unknown enum. */
        enum unknown {
            c = 0,
            d = 1,
            e = 2
        }
    }

    /** Properties of a Button. */
    interface IButton {

        /** Button a */
        a?: (string|null);

        /** Button b */
        b?: (string|null);

        /** Button c */
        c?: (AcFunDanmu.ZtLiveCommonModelProto|null);

        /** Button d */
        d?: (number|null);
    }

    /** Represents a Button. */
    class Button implements IButton {

        /**
         * Constructs a new Button.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IButton);

        /** Button a. */
        public a: string;

        /** Button b. */
        public b: string;

        /** Button c. */
        public c: AcFunDanmu.ZtLiveCommonModelProto;

        /** Button d. */
        public d: number;

        /**
         * Creates a new Button instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Button instance
         */
        public static create(properties?: AcFunDanmu.IButton): AcFunDanmu.Button;

        /**
         * Encodes the specified Button message. Does not implicitly {@link AcFunDanmu.Button.verify|verify} messages.
         * @param message Button message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IButton, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Button message, length delimited. Does not implicitly {@link AcFunDanmu.Button.verify|verify} messages.
         * @param message Button message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IButton, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Button message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Button
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.Button;

        /**
         * Decodes a Button message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Button
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.Button;

        /**
         * Verifies a Button message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Button message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Button
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.Button;

        /**
         * Creates a plain object from a Button message. Also converts values to other types if specified.
         * @param message Button
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.Button, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Button to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Button
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** ZtLiveCommonModelProto enum. */
    enum ZtLiveCommonModelProto {
        ZtLiveCommonModelProtoA = 0,
        ZtLiveCommonModelProtoB = 1,
        ZtLiveCommonModelProtoC = 2
    }

    /** ChatMediaType enum. */
    enum ChatMediaType {
        UNKNOWN = 0,
        AUDIO = 1,
        VIDEO = 2
    }

    /** Properties of a ClickEvent. */
    interface IClickEvent {

        /** ClickEvent url */
        url?: (string|null);

        /** ClickEvent urlType */
        urlType?: (AcFunDanmu.ZtLiveCommonModelProto|null);

        /** ClickEvent heightPercent */
        heightPercent?: (number|null);
    }

    /** Represents a ClickEvent. */
    class ClickEvent implements IClickEvent {

        /**
         * Constructs a new ClickEvent.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IClickEvent);

        /** ClickEvent url. */
        public url: string;

        /** ClickEvent urlType. */
        public urlType: AcFunDanmu.ZtLiveCommonModelProto;

        /** ClickEvent heightPercent. */
        public heightPercent: number;

        /**
         * Creates a new ClickEvent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClickEvent instance
         */
        public static create(properties?: AcFunDanmu.IClickEvent): AcFunDanmu.ClickEvent;

        /**
         * Encodes the specified ClickEvent message. Does not implicitly {@link AcFunDanmu.ClickEvent.verify|verify} messages.
         * @param message ClickEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IClickEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClickEvent message, length delimited. Does not implicitly {@link AcFunDanmu.ClickEvent.verify|verify} messages.
         * @param message ClickEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IClickEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClickEvent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClickEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ClickEvent;

        /**
         * Decodes a ClickEvent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClickEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ClickEvent;

        /**
         * Verifies a ClickEvent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClickEvent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClickEvent
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ClickEvent;

        /**
         * Creates a plain object from a ClickEvent message. Also converts values to other types if specified.
         * @param message ClickEvent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ClickEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClickEvent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ClickEvent
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommentNotice. */
    interface ICommentNotice {

        /** CommentNotice a */
        a?: (string|null);

        /** CommentNotice b */
        b?: (Uint8Array|null);

        /** CommentNotice c */
        c?: (string|null);

        /** CommentNotice d */
        d?: (AcFunDanmu.IImageCdnNode[]|null);

        /** CommentNotice e */
        e?: (AcFunDanmu.IImageCdnNode[]|null);

        /** CommentNotice f */
        f?: (string|null);

        /** CommentNotice g */
        g?: (string|null);

        /** CommentNotice h */
        h?: (AcFunDanmu.IButton|null);

        /** CommentNotice i */
        i?: (AcFunDanmu.IClickEvent|null);

        /** CommentNotice j */
        j?: (number|null);

        /** CommentNotice k */
        k?: (number|Long|null);

        /** CommentNotice l */
        l?: (number|Long|null);

        /** CommentNotice m */
        m?: (number|null);
    }

    /** Represents a CommentNotice. */
    class CommentNotice implements ICommentNotice {

        /**
         * Constructs a new CommentNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommentNotice);

        /** CommentNotice a. */
        public a: string;

        /** CommentNotice b. */
        public b: Uint8Array;

        /** CommentNotice c. */
        public c: string;

        /** CommentNotice d. */
        public d: AcFunDanmu.IImageCdnNode[];

        /** CommentNotice e. */
        public e: AcFunDanmu.IImageCdnNode[];

        /** CommentNotice f. */
        public f: string;

        /** CommentNotice g. */
        public g: string;

        /** CommentNotice h. */
        public h?: (AcFunDanmu.IButton|null);

        /** CommentNotice i. */
        public i?: (AcFunDanmu.IClickEvent|null);

        /** CommentNotice j. */
        public j: number;

        /** CommentNotice k. */
        public k: (number|Long);

        /** CommentNotice l. */
        public l: (number|Long);

        /** CommentNotice m. */
        public m: number;

        /**
         * Creates a new CommentNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommentNotice instance
         */
        public static create(properties?: AcFunDanmu.ICommentNotice): AcFunDanmu.CommentNotice;

        /**
         * Encodes the specified CommentNotice message. Does not implicitly {@link AcFunDanmu.CommentNotice.verify|verify} messages.
         * @param message CommentNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommentNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommentNotice message, length delimited. Does not implicitly {@link AcFunDanmu.CommentNotice.verify|verify} messages.
         * @param message CommentNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommentNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommentNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommentNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommentNotice;

        /**
         * Decodes a CommentNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommentNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommentNotice;

        /**
         * Verifies a CommentNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommentNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommentNotice
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommentNotice;

        /**
         * Creates a plain object from a CommentNotice message. Also converts values to other types if specified.
         * @param message CommentNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommentNotice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommentNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommentNotice
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonActionSignalComment. */
    interface ICommonActionSignalComment {

        /** CommonActionSignalComment content */
        content?: (string|null);

        /** CommonActionSignalComment sendTimeMs */
        sendTimeMs?: (number|Long|null);

        /** CommonActionSignalComment userInfo */
        userInfo?: (AcFunDanmu.IZtLiveUserInfo|null);
    }

    /** Represents a CommonActionSignalComment. */
    class CommonActionSignalComment implements ICommonActionSignalComment {

        /**
         * Constructs a new CommonActionSignalComment.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonActionSignalComment);

        /** CommonActionSignalComment content. */
        public content: string;

        /** CommonActionSignalComment sendTimeMs. */
        public sendTimeMs: (number|Long);

        /** CommonActionSignalComment userInfo. */
        public userInfo?: (AcFunDanmu.IZtLiveUserInfo|null);

        /**
         * Creates a new CommonActionSignalComment instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonActionSignalComment instance
         */
        public static create(properties?: AcFunDanmu.ICommonActionSignalComment): AcFunDanmu.CommonActionSignalComment;

        /**
         * Encodes the specified CommonActionSignalComment message. Does not implicitly {@link AcFunDanmu.CommonActionSignalComment.verify|verify} messages.
         * @param message CommonActionSignalComment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonActionSignalComment, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonActionSignalComment message, length delimited. Does not implicitly {@link AcFunDanmu.CommonActionSignalComment.verify|verify} messages.
         * @param message CommonActionSignalComment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonActionSignalComment, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonActionSignalComment message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonActionSignalComment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonActionSignalComment;

        /**
         * Decodes a CommonActionSignalComment message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonActionSignalComment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonActionSignalComment;

        /**
         * Verifies a CommonActionSignalComment message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonActionSignalComment message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonActionSignalComment
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonActionSignalComment;

        /**
         * Creates a plain object from a CommonActionSignalComment message. Also converts values to other types if specified.
         * @param message CommonActionSignalComment
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonActionSignalComment, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonActionSignalComment to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonActionSignalComment
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonActionSignalGift. */
    interface ICommonActionSignalGift {

        /** CommonActionSignalGift userInfo */
        userInfo?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** CommonActionSignalGift sendTimeMs */
        sendTimeMs?: (number|Long|null);

        /** CommonActionSignalGift giftId */
        giftId?: (number|Long|null);

        /** CommonActionSignalGift batchSize */
        batchSize?: (number|null);

        /** CommonActionSignalGift comboCount */
        comboCount?: (number|null);

        /** CommonActionSignalGift rank */
        rank?: (number|Long|null);

        /** CommonActionSignalGift comboKey */
        comboKey?: (string|null);

        /** CommonActionSignalGift slotDisplayDurationMs */
        slotDisplayDurationMs?: (number|Long|null);

        /** CommonActionSignalGift expireDurationMs */
        expireDurationMs?: (number|Long|null);

        /** CommonActionSignalGift drawGiftInfo */
        drawGiftInfo?: (AcFunDanmu.IZtDrawGiftInfo|null);
    }

    /** Represents a CommonActionSignalGift. */
    class CommonActionSignalGift implements ICommonActionSignalGift {

        /**
         * Constructs a new CommonActionSignalGift.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonActionSignalGift);

        /** CommonActionSignalGift userInfo. */
        public userInfo?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** CommonActionSignalGift sendTimeMs. */
        public sendTimeMs: (number|Long);

        /** CommonActionSignalGift giftId. */
        public giftId: (number|Long);

        /** CommonActionSignalGift batchSize. */
        public batchSize: number;

        /** CommonActionSignalGift comboCount. */
        public comboCount: number;

        /** CommonActionSignalGift rank. */
        public rank: (number|Long);

        /** CommonActionSignalGift comboKey. */
        public comboKey: string;

        /** CommonActionSignalGift slotDisplayDurationMs. */
        public slotDisplayDurationMs: (number|Long);

        /** CommonActionSignalGift expireDurationMs. */
        public expireDurationMs: (number|Long);

        /** CommonActionSignalGift drawGiftInfo. */
        public drawGiftInfo?: (AcFunDanmu.IZtDrawGiftInfo|null);

        /**
         * Creates a new CommonActionSignalGift instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonActionSignalGift instance
         */
        public static create(properties?: AcFunDanmu.ICommonActionSignalGift): AcFunDanmu.CommonActionSignalGift;

        /**
         * Encodes the specified CommonActionSignalGift message. Does not implicitly {@link AcFunDanmu.CommonActionSignalGift.verify|verify} messages.
         * @param message CommonActionSignalGift message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonActionSignalGift, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonActionSignalGift message, length delimited. Does not implicitly {@link AcFunDanmu.CommonActionSignalGift.verify|verify} messages.
         * @param message CommonActionSignalGift message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonActionSignalGift, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonActionSignalGift message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonActionSignalGift
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonActionSignalGift;

        /**
         * Decodes a CommonActionSignalGift message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonActionSignalGift
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonActionSignalGift;

        /**
         * Verifies a CommonActionSignalGift message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonActionSignalGift message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonActionSignalGift
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonActionSignalGift;

        /**
         * Creates a plain object from a CommonActionSignalGift message. Also converts values to other types if specified.
         * @param message CommonActionSignalGift
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonActionSignalGift, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonActionSignalGift to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonActionSignalGift
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtDrawGiftInfo. */
    interface IZtDrawGiftInfo {

        /** ZtDrawGiftInfo screenWidth */
        screenWidth?: (number|Long|null);

        /** ZtDrawGiftInfo screenHeight */
        screenHeight?: (number|Long|null);

        /** ZtDrawGiftInfo drawPoint */
        drawPoint?: (AcFunDanmu.ZtDrawGiftInfo.IZtDrawPoint[]|null);
    }

    /** Represents a ZtDrawGiftInfo. */
    class ZtDrawGiftInfo implements IZtDrawGiftInfo {

        /**
         * Constructs a new ZtDrawGiftInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtDrawGiftInfo);

        /** ZtDrawGiftInfo screenWidth. */
        public screenWidth: (number|Long);

        /** ZtDrawGiftInfo screenHeight. */
        public screenHeight: (number|Long);

        /** ZtDrawGiftInfo drawPoint. */
        public drawPoint: AcFunDanmu.ZtDrawGiftInfo.IZtDrawPoint[];

        /**
         * Creates a new ZtDrawGiftInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtDrawGiftInfo instance
         */
        public static create(properties?: AcFunDanmu.IZtDrawGiftInfo): AcFunDanmu.ZtDrawGiftInfo;

        /**
         * Encodes the specified ZtDrawGiftInfo message. Does not implicitly {@link AcFunDanmu.ZtDrawGiftInfo.verify|verify} messages.
         * @param message ZtDrawGiftInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtDrawGiftInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtDrawGiftInfo message, length delimited. Does not implicitly {@link AcFunDanmu.ZtDrawGiftInfo.verify|verify} messages.
         * @param message ZtDrawGiftInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtDrawGiftInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtDrawGiftInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtDrawGiftInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtDrawGiftInfo;

        /**
         * Decodes a ZtDrawGiftInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtDrawGiftInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtDrawGiftInfo;

        /**
         * Verifies a ZtDrawGiftInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtDrawGiftInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtDrawGiftInfo
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtDrawGiftInfo;

        /**
         * Creates a plain object from a ZtDrawGiftInfo message. Also converts values to other types if specified.
         * @param message ZtDrawGiftInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtDrawGiftInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtDrawGiftInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtDrawGiftInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace ZtDrawGiftInfo {

        /** Properties of a ZtDrawPoint. */
        interface IZtDrawPoint {

            /** ZtDrawPoint marginLeft */
            marginLeft?: (number|Long|null);

            /** ZtDrawPoint marginTop */
            marginTop?: (number|Long|null);

            /** ZtDrawPoint scaleRatio */
            scaleRatio?: (number|null);

            /** ZtDrawPoint handup */
            handup?: (boolean|null);

            /** ZtDrawPoint pointWidth */
            pointWidth?: (number|Long|null);

            /** ZtDrawPoint pointHeight */
            pointHeight?: (number|Long|null);
        }

        /** Represents a ZtDrawPoint. */
        class ZtDrawPoint implements IZtDrawPoint {

            /**
             * Constructs a new ZtDrawPoint.
             * @param [properties] Properties to set
             */
            constructor(properties?: AcFunDanmu.ZtDrawGiftInfo.IZtDrawPoint);

            /** ZtDrawPoint marginLeft. */
            public marginLeft: (number|Long);

            /** ZtDrawPoint marginTop. */
            public marginTop: (number|Long);

            /** ZtDrawPoint scaleRatio. */
            public scaleRatio: number;

            /** ZtDrawPoint handup. */
            public handup: boolean;

            /** ZtDrawPoint pointWidth. */
            public pointWidth: (number|Long);

            /** ZtDrawPoint pointHeight. */
            public pointHeight: (number|Long);

            /**
             * Creates a new ZtDrawPoint instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ZtDrawPoint instance
             */
            public static create(properties?: AcFunDanmu.ZtDrawGiftInfo.IZtDrawPoint): AcFunDanmu.ZtDrawGiftInfo.ZtDrawPoint;

            /**
             * Encodes the specified ZtDrawPoint message. Does not implicitly {@link AcFunDanmu.ZtDrawGiftInfo.ZtDrawPoint.verify|verify} messages.
             * @param message ZtDrawPoint message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AcFunDanmu.ZtDrawGiftInfo.IZtDrawPoint, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ZtDrawPoint message, length delimited. Does not implicitly {@link AcFunDanmu.ZtDrawGiftInfo.ZtDrawPoint.verify|verify} messages.
             * @param message ZtDrawPoint message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AcFunDanmu.ZtDrawGiftInfo.IZtDrawPoint, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ZtDrawPoint message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ZtDrawPoint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtDrawGiftInfo.ZtDrawPoint;

            /**
             * Decodes a ZtDrawPoint message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ZtDrawPoint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtDrawGiftInfo.ZtDrawPoint;

            /**
             * Verifies a ZtDrawPoint message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ZtDrawPoint message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ZtDrawPoint
             */
            public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtDrawGiftInfo.ZtDrawPoint;

            /**
             * Creates a plain object from a ZtDrawPoint message. Also converts values to other types if specified.
             * @param message ZtDrawPoint
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AcFunDanmu.ZtDrawGiftInfo.ZtDrawPoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ZtDrawPoint to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ZtDrawPoint
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a CommonActionSignalLike. */
    interface ICommonActionSignalLike {

        /** CommonActionSignalLike userInfo */
        userInfo?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** CommonActionSignalLike sendTimeMs */
        sendTimeMs?: (number|Long|null);
    }

    /** Represents a CommonActionSignalLike. */
    class CommonActionSignalLike implements ICommonActionSignalLike {

        /**
         * Constructs a new CommonActionSignalLike.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonActionSignalLike);

        /** CommonActionSignalLike userInfo. */
        public userInfo?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** CommonActionSignalLike sendTimeMs. */
        public sendTimeMs: (number|Long);

        /**
         * Creates a new CommonActionSignalLike instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonActionSignalLike instance
         */
        public static create(properties?: AcFunDanmu.ICommonActionSignalLike): AcFunDanmu.CommonActionSignalLike;

        /**
         * Encodes the specified CommonActionSignalLike message. Does not implicitly {@link AcFunDanmu.CommonActionSignalLike.verify|verify} messages.
         * @param message CommonActionSignalLike message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonActionSignalLike, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonActionSignalLike message, length delimited. Does not implicitly {@link AcFunDanmu.CommonActionSignalLike.verify|verify} messages.
         * @param message CommonActionSignalLike message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonActionSignalLike, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonActionSignalLike message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonActionSignalLike
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonActionSignalLike;

        /**
         * Decodes a CommonActionSignalLike message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonActionSignalLike
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonActionSignalLike;

        /**
         * Verifies a CommonActionSignalLike message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonActionSignalLike message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonActionSignalLike
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonActionSignalLike;

        /**
         * Creates a plain object from a CommonActionSignalLike message. Also converts values to other types if specified.
         * @param message CommonActionSignalLike
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonActionSignalLike, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonActionSignalLike to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonActionSignalLike
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonActionSignalRichText. */
    interface ICommonActionSignalRichText {

        /** CommonActionSignalRichText segments */
        segments?: (AcFunDanmu.CommonActionSignalRichText.IRichTextSegment[]|null);

        /** CommonActionSignalRichText sendTimeMs */
        sendTimeMs?: (number|Long|null);
    }

    /** Represents a CommonActionSignalRichText. */
    class CommonActionSignalRichText implements ICommonActionSignalRichText {

        /**
         * Constructs a new CommonActionSignalRichText.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonActionSignalRichText);

        /** CommonActionSignalRichText segments. */
        public segments: AcFunDanmu.CommonActionSignalRichText.IRichTextSegment[];

        /** CommonActionSignalRichText sendTimeMs. */
        public sendTimeMs: (number|Long);

        /**
         * Creates a new CommonActionSignalRichText instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonActionSignalRichText instance
         */
        public static create(properties?: AcFunDanmu.ICommonActionSignalRichText): AcFunDanmu.CommonActionSignalRichText;

        /**
         * Encodes the specified CommonActionSignalRichText message. Does not implicitly {@link AcFunDanmu.CommonActionSignalRichText.verify|verify} messages.
         * @param message CommonActionSignalRichText message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonActionSignalRichText, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonActionSignalRichText message, length delimited. Does not implicitly {@link AcFunDanmu.CommonActionSignalRichText.verify|verify} messages.
         * @param message CommonActionSignalRichText message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonActionSignalRichText, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonActionSignalRichText message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonActionSignalRichText
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonActionSignalRichText;

        /**
         * Decodes a CommonActionSignalRichText message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonActionSignalRichText
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonActionSignalRichText;

        /**
         * Verifies a CommonActionSignalRichText message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonActionSignalRichText message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonActionSignalRichText
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonActionSignalRichText;

        /**
         * Creates a plain object from a CommonActionSignalRichText message. Also converts values to other types if specified.
         * @param message CommonActionSignalRichText
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonActionSignalRichText, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonActionSignalRichText to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonActionSignalRichText
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CommonActionSignalRichText {

        /** Properties of an ImageSegment. */
        interface IImageSegment {

            /** ImageSegment pictures */
            pictures?: (AcFunDanmu.IImageCdnNode[]|null);

            /** ImageSegment alternativeText */
            alternativeText?: (string|null);

            /** ImageSegment alternativeColor */
            alternativeColor?: (string|null);

            /** ImageSegment d */
            d?: (string|null);
        }

        /** Represents an ImageSegment. */
        class ImageSegment implements IImageSegment {

            /**
             * Constructs a new ImageSegment.
             * @param [properties] Properties to set
             */
            constructor(properties?: AcFunDanmu.CommonActionSignalRichText.IImageSegment);

            /** ImageSegment pictures. */
            public pictures: AcFunDanmu.IImageCdnNode[];

            /** ImageSegment alternativeText. */
            public alternativeText: string;

            /** ImageSegment alternativeColor. */
            public alternativeColor: string;

            /** ImageSegment d. */
            public d: string;

            /**
             * Creates a new ImageSegment instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ImageSegment instance
             */
            public static create(properties?: AcFunDanmu.CommonActionSignalRichText.IImageSegment): AcFunDanmu.CommonActionSignalRichText.ImageSegment;

            /**
             * Encodes the specified ImageSegment message. Does not implicitly {@link AcFunDanmu.CommonActionSignalRichText.ImageSegment.verify|verify} messages.
             * @param message ImageSegment message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AcFunDanmu.CommonActionSignalRichText.IImageSegment, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ImageSegment message, length delimited. Does not implicitly {@link AcFunDanmu.CommonActionSignalRichText.ImageSegment.verify|verify} messages.
             * @param message ImageSegment message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AcFunDanmu.CommonActionSignalRichText.IImageSegment, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ImageSegment message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ImageSegment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonActionSignalRichText.ImageSegment;

            /**
             * Decodes an ImageSegment message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ImageSegment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonActionSignalRichText.ImageSegment;

            /**
             * Verifies an ImageSegment message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ImageSegment message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ImageSegment
             */
            public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonActionSignalRichText.ImageSegment;

            /**
             * Creates a plain object from an ImageSegment message. Also converts values to other types if specified.
             * @param message ImageSegment
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AcFunDanmu.CommonActionSignalRichText.ImageSegment, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ImageSegment to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ImageSegment
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PlainSegment. */
        interface IPlainSegment {

            /** PlainSegment text */
            text?: (string|null);

            /** PlainSegment color */
            color?: (string|null);

            /** PlainSegment c */
            c?: (string|null);
        }

        /** Represents a PlainSegment. */
        class PlainSegment implements IPlainSegment {

            /**
             * Constructs a new PlainSegment.
             * @param [properties] Properties to set
             */
            constructor(properties?: AcFunDanmu.CommonActionSignalRichText.IPlainSegment);

            /** PlainSegment text. */
            public text: string;

            /** PlainSegment color. */
            public color: string;

            /** PlainSegment c. */
            public c: string;

            /**
             * Creates a new PlainSegment instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PlainSegment instance
             */
            public static create(properties?: AcFunDanmu.CommonActionSignalRichText.IPlainSegment): AcFunDanmu.CommonActionSignalRichText.PlainSegment;

            /**
             * Encodes the specified PlainSegment message. Does not implicitly {@link AcFunDanmu.CommonActionSignalRichText.PlainSegment.verify|verify} messages.
             * @param message PlainSegment message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AcFunDanmu.CommonActionSignalRichText.IPlainSegment, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PlainSegment message, length delimited. Does not implicitly {@link AcFunDanmu.CommonActionSignalRichText.PlainSegment.verify|verify} messages.
             * @param message PlainSegment message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AcFunDanmu.CommonActionSignalRichText.IPlainSegment, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PlainSegment message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PlainSegment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonActionSignalRichText.PlainSegment;

            /**
             * Decodes a PlainSegment message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PlainSegment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonActionSignalRichText.PlainSegment;

            /**
             * Verifies a PlainSegment message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PlainSegment message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PlainSegment
             */
            public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonActionSignalRichText.PlainSegment;

            /**
             * Creates a plain object from a PlainSegment message. Also converts values to other types if specified.
             * @param message PlainSegment
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AcFunDanmu.CommonActionSignalRichText.PlainSegment, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PlainSegment to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PlainSegment
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a RichTextSegment. */
        interface IRichTextSegment {

            /** RichTextSegment userInfo */
            userInfo?: (AcFunDanmu.CommonActionSignalRichText.IUserInfoSegment|null);

            /** RichTextSegment plain */
            plain?: (AcFunDanmu.CommonActionSignalRichText.IPlainSegment|null);

            /** RichTextSegment image */
            image?: (AcFunDanmu.CommonActionSignalRichText.IImageSegment|null);
        }

        /** Represents a RichTextSegment. */
        class RichTextSegment implements IRichTextSegment {

            /**
             * Constructs a new RichTextSegment.
             * @param [properties] Properties to set
             */
            constructor(properties?: AcFunDanmu.CommonActionSignalRichText.IRichTextSegment);

            /** RichTextSegment userInfo. */
            public userInfo?: (AcFunDanmu.CommonActionSignalRichText.IUserInfoSegment|null);

            /** RichTextSegment plain. */
            public plain?: (AcFunDanmu.CommonActionSignalRichText.IPlainSegment|null);

            /** RichTextSegment image. */
            public image?: (AcFunDanmu.CommonActionSignalRichText.IImageSegment|null);

            /** RichTextSegment segment. */
            public segment?: ("userInfo"|"plain"|"image");

            /**
             * Creates a new RichTextSegment instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RichTextSegment instance
             */
            public static create(properties?: AcFunDanmu.CommonActionSignalRichText.IRichTextSegment): AcFunDanmu.CommonActionSignalRichText.RichTextSegment;

            /**
             * Encodes the specified RichTextSegment message. Does not implicitly {@link AcFunDanmu.CommonActionSignalRichText.RichTextSegment.verify|verify} messages.
             * @param message RichTextSegment message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AcFunDanmu.CommonActionSignalRichText.IRichTextSegment, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RichTextSegment message, length delimited. Does not implicitly {@link AcFunDanmu.CommonActionSignalRichText.RichTextSegment.verify|verify} messages.
             * @param message RichTextSegment message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AcFunDanmu.CommonActionSignalRichText.IRichTextSegment, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RichTextSegment message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RichTextSegment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonActionSignalRichText.RichTextSegment;

            /**
             * Decodes a RichTextSegment message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RichTextSegment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonActionSignalRichText.RichTextSegment;

            /**
             * Verifies a RichTextSegment message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RichTextSegment message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RichTextSegment
             */
            public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonActionSignalRichText.RichTextSegment;

            /**
             * Creates a plain object from a RichTextSegment message. Also converts values to other types if specified.
             * @param message RichTextSegment
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AcFunDanmu.CommonActionSignalRichText.RichTextSegment, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RichTextSegment to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for RichTextSegment
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a UserInfoSegment. */
        interface IUserInfoSegment {

            /** UserInfoSegment user */
            user?: (AcFunDanmu.IZtLiveUserInfo|null);

            /** UserInfoSegment color */
            color?: (string|null);
        }

        /** Represents a UserInfoSegment. */
        class UserInfoSegment implements IUserInfoSegment {

            /**
             * Constructs a new UserInfoSegment.
             * @param [properties] Properties to set
             */
            constructor(properties?: AcFunDanmu.CommonActionSignalRichText.IUserInfoSegment);

            /** UserInfoSegment user. */
            public user?: (AcFunDanmu.IZtLiveUserInfo|null);

            /** UserInfoSegment color. */
            public color: string;

            /**
             * Creates a new UserInfoSegment instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserInfoSegment instance
             */
            public static create(properties?: AcFunDanmu.CommonActionSignalRichText.IUserInfoSegment): AcFunDanmu.CommonActionSignalRichText.UserInfoSegment;

            /**
             * Encodes the specified UserInfoSegment message. Does not implicitly {@link AcFunDanmu.CommonActionSignalRichText.UserInfoSegment.verify|verify} messages.
             * @param message UserInfoSegment message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AcFunDanmu.CommonActionSignalRichText.IUserInfoSegment, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UserInfoSegment message, length delimited. Does not implicitly {@link AcFunDanmu.CommonActionSignalRichText.UserInfoSegment.verify|verify} messages.
             * @param message UserInfoSegment message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AcFunDanmu.CommonActionSignalRichText.IUserInfoSegment, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UserInfoSegment message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserInfoSegment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonActionSignalRichText.UserInfoSegment;

            /**
             * Decodes a UserInfoSegment message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserInfoSegment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonActionSignalRichText.UserInfoSegment;

            /**
             * Verifies a UserInfoSegment message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UserInfoSegment message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserInfoSegment
             */
            public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonActionSignalRichText.UserInfoSegment;

            /**
             * Creates a plain object from a UserInfoSegment message. Also converts values to other types if specified.
             * @param message UserInfoSegment
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AcFunDanmu.CommonActionSignalRichText.UserInfoSegment, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UserInfoSegment to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for UserInfoSegment
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a CommonActionSignalUserEnterRoom. */
    interface ICommonActionSignalUserEnterRoom {

        /** CommonActionSignalUserEnterRoom userInfo */
        userInfo?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** CommonActionSignalUserEnterRoom sendTimeMs */
        sendTimeMs?: (number|Long|null);
    }

    /** Represents a CommonActionSignalUserEnterRoom. */
    class CommonActionSignalUserEnterRoom implements ICommonActionSignalUserEnterRoom {

        /**
         * Constructs a new CommonActionSignalUserEnterRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonActionSignalUserEnterRoom);

        /** CommonActionSignalUserEnterRoom userInfo. */
        public userInfo?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** CommonActionSignalUserEnterRoom sendTimeMs. */
        public sendTimeMs: (number|Long);

        /**
         * Creates a new CommonActionSignalUserEnterRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonActionSignalUserEnterRoom instance
         */
        public static create(properties?: AcFunDanmu.ICommonActionSignalUserEnterRoom): AcFunDanmu.CommonActionSignalUserEnterRoom;

        /**
         * Encodes the specified CommonActionSignalUserEnterRoom message. Does not implicitly {@link AcFunDanmu.CommonActionSignalUserEnterRoom.verify|verify} messages.
         * @param message CommonActionSignalUserEnterRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonActionSignalUserEnterRoom, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonActionSignalUserEnterRoom message, length delimited. Does not implicitly {@link AcFunDanmu.CommonActionSignalUserEnterRoom.verify|verify} messages.
         * @param message CommonActionSignalUserEnterRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonActionSignalUserEnterRoom, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonActionSignalUserEnterRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonActionSignalUserEnterRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonActionSignalUserEnterRoom;

        /**
         * Decodes a CommonActionSignalUserEnterRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonActionSignalUserEnterRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonActionSignalUserEnterRoom;

        /**
         * Verifies a CommonActionSignalUserEnterRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonActionSignalUserEnterRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonActionSignalUserEnterRoom
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonActionSignalUserEnterRoom;

        /**
         * Creates a plain object from a CommonActionSignalUserEnterRoom message. Also converts values to other types if specified.
         * @param message CommonActionSignalUserEnterRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonActionSignalUserEnterRoom, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonActionSignalUserEnterRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonActionSignalUserEnterRoom
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonActionSignalUserFollowAuthor. */
    interface ICommonActionSignalUserFollowAuthor {

        /** CommonActionSignalUserFollowAuthor userInfo */
        userInfo?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** CommonActionSignalUserFollowAuthor sendTimeMs */
        sendTimeMs?: (number|Long|null);
    }

    /** Represents a CommonActionSignalUserFollowAuthor. */
    class CommonActionSignalUserFollowAuthor implements ICommonActionSignalUserFollowAuthor {

        /**
         * Constructs a new CommonActionSignalUserFollowAuthor.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonActionSignalUserFollowAuthor);

        /** CommonActionSignalUserFollowAuthor userInfo. */
        public userInfo?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** CommonActionSignalUserFollowAuthor sendTimeMs. */
        public sendTimeMs: (number|Long);

        /**
         * Creates a new CommonActionSignalUserFollowAuthor instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonActionSignalUserFollowAuthor instance
         */
        public static create(properties?: AcFunDanmu.ICommonActionSignalUserFollowAuthor): AcFunDanmu.CommonActionSignalUserFollowAuthor;

        /**
         * Encodes the specified CommonActionSignalUserFollowAuthor message. Does not implicitly {@link AcFunDanmu.CommonActionSignalUserFollowAuthor.verify|verify} messages.
         * @param message CommonActionSignalUserFollowAuthor message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonActionSignalUserFollowAuthor, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonActionSignalUserFollowAuthor message, length delimited. Does not implicitly {@link AcFunDanmu.CommonActionSignalUserFollowAuthor.verify|verify} messages.
         * @param message CommonActionSignalUserFollowAuthor message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonActionSignalUserFollowAuthor, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonActionSignalUserFollowAuthor message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonActionSignalUserFollowAuthor
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonActionSignalUserFollowAuthor;

        /**
         * Decodes a CommonActionSignalUserFollowAuthor message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonActionSignalUserFollowAuthor
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonActionSignalUserFollowAuthor;

        /**
         * Verifies a CommonActionSignalUserFollowAuthor message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonActionSignalUserFollowAuthor message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonActionSignalUserFollowAuthor
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonActionSignalUserFollowAuthor;

        /**
         * Creates a plain object from a CommonActionSignalUserFollowAuthor message. Also converts values to other types if specified.
         * @param message CommonActionSignalUserFollowAuthor
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonActionSignalUserFollowAuthor, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonActionSignalUserFollowAuthor to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonActionSignalUserFollowAuthor
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonActionSignalUserShareLive. */
    interface ICommonActionSignalUserShareLive {

        /** CommonActionSignalUserShareLive userInfo */
        userInfo?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** CommonActionSignalUserShareLive sharePlatformId */
        sharePlatformId?: (number|null);

        /** CommonActionSignalUserShareLive sharePlatformIcon */
        sharePlatformIcon?: (string|null);

        /** CommonActionSignalUserShareLive sendTimeMs */
        sendTimeMs?: (number|Long|null);
    }

    /** Represents a CommonActionSignalUserShareLive. */
    class CommonActionSignalUserShareLive implements ICommonActionSignalUserShareLive {

        /**
         * Constructs a new CommonActionSignalUserShareLive.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonActionSignalUserShareLive);

        /** CommonActionSignalUserShareLive userInfo. */
        public userInfo?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** CommonActionSignalUserShareLive sharePlatformId. */
        public sharePlatformId: number;

        /** CommonActionSignalUserShareLive sharePlatformIcon. */
        public sharePlatformIcon: string;

        /** CommonActionSignalUserShareLive sendTimeMs. */
        public sendTimeMs: (number|Long);

        /**
         * Creates a new CommonActionSignalUserShareLive instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonActionSignalUserShareLive instance
         */
        public static create(properties?: AcFunDanmu.ICommonActionSignalUserShareLive): AcFunDanmu.CommonActionSignalUserShareLive;

        /**
         * Encodes the specified CommonActionSignalUserShareLive message. Does not implicitly {@link AcFunDanmu.CommonActionSignalUserShareLive.verify|verify} messages.
         * @param message CommonActionSignalUserShareLive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonActionSignalUserShareLive, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonActionSignalUserShareLive message, length delimited. Does not implicitly {@link AcFunDanmu.CommonActionSignalUserShareLive.verify|verify} messages.
         * @param message CommonActionSignalUserShareLive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonActionSignalUserShareLive, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonActionSignalUserShareLive message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonActionSignalUserShareLive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonActionSignalUserShareLive;

        /**
         * Decodes a CommonActionSignalUserShareLive message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonActionSignalUserShareLive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonActionSignalUserShareLive;

        /**
         * Verifies a CommonActionSignalUserShareLive message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonActionSignalUserShareLive message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonActionSignalUserShareLive
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonActionSignalUserShareLive;

        /**
         * Creates a plain object from a CommonActionSignalUserShareLive message. Also converts values to other types if specified.
         * @param message CommonActionSignalUserShareLive
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonActionSignalUserShareLive, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonActionSignalUserShareLive to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonActionSignalUserShareLive
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CommonActionSignalUserShareLive {

        /** unknown enum. */
        enum unknown {
            e = 0,
            f = 1
        }
    }

    /** Properties of a CommonNotifySignalCoverAuditResult. */
    interface ICommonNotifySignalCoverAuditResult {

        /** CommonNotifySignalCoverAuditResult auditStatus */
        auditStatus?: (AcFunDanmu.CommonNotifySignalCoverAuditResult.AuditStatus|null);
    }

    /** Represents a CommonNotifySignalCoverAuditResult. */
    class CommonNotifySignalCoverAuditResult implements ICommonNotifySignalCoverAuditResult {

        /**
         * Constructs a new CommonNotifySignalCoverAuditResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonNotifySignalCoverAuditResult);

        /** CommonNotifySignalCoverAuditResult auditStatus. */
        public auditStatus: AcFunDanmu.CommonNotifySignalCoverAuditResult.AuditStatus;

        /**
         * Creates a new CommonNotifySignalCoverAuditResult instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonNotifySignalCoverAuditResult instance
         */
        public static create(properties?: AcFunDanmu.ICommonNotifySignalCoverAuditResult): AcFunDanmu.CommonNotifySignalCoverAuditResult;

        /**
         * Encodes the specified CommonNotifySignalCoverAuditResult message. Does not implicitly {@link AcFunDanmu.CommonNotifySignalCoverAuditResult.verify|verify} messages.
         * @param message CommonNotifySignalCoverAuditResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonNotifySignalCoverAuditResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonNotifySignalCoverAuditResult message, length delimited. Does not implicitly {@link AcFunDanmu.CommonNotifySignalCoverAuditResult.verify|verify} messages.
         * @param message CommonNotifySignalCoverAuditResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonNotifySignalCoverAuditResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonNotifySignalCoverAuditResult message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonNotifySignalCoverAuditResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonNotifySignalCoverAuditResult;

        /**
         * Decodes a CommonNotifySignalCoverAuditResult message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonNotifySignalCoverAuditResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonNotifySignalCoverAuditResult;

        /**
         * Verifies a CommonNotifySignalCoverAuditResult message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonNotifySignalCoverAuditResult message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonNotifySignalCoverAuditResult
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonNotifySignalCoverAuditResult;

        /**
         * Creates a plain object from a CommonNotifySignalCoverAuditResult message. Also converts values to other types if specified.
         * @param message CommonNotifySignalCoverAuditResult
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonNotifySignalCoverAuditResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonNotifySignalCoverAuditResult to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonNotifySignalCoverAuditResult
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CommonNotifySignalCoverAuditResult {

        /** AuditStatus enum. */
        enum AuditStatus {
            SUCCESS = 0,
            COVER_AUDIT_FAILED = 1,
            CAPTION_AUDIT_FAILED = 2,
            BOTH_FAILED = 3
        }
    }

    /** Properties of a CommonNotifySignalKickedOut. */
    interface ICommonNotifySignalKickedOut {

        /** CommonNotifySignalKickedOut reason */
        reason?: (string|null);

        /** CommonNotifySignalKickedOut b */
        b?: (string|null);
    }

    /** Represents a CommonNotifySignalKickedOut. */
    class CommonNotifySignalKickedOut implements ICommonNotifySignalKickedOut {

        /**
         * Constructs a new CommonNotifySignalKickedOut.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonNotifySignalKickedOut);

        /** CommonNotifySignalKickedOut reason. */
        public reason: string;

        /** CommonNotifySignalKickedOut b. */
        public b: string;

        /**
         * Creates a new CommonNotifySignalKickedOut instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonNotifySignalKickedOut instance
         */
        public static create(properties?: AcFunDanmu.ICommonNotifySignalKickedOut): AcFunDanmu.CommonNotifySignalKickedOut;

        /**
         * Encodes the specified CommonNotifySignalKickedOut message. Does not implicitly {@link AcFunDanmu.CommonNotifySignalKickedOut.verify|verify} messages.
         * @param message CommonNotifySignalKickedOut message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonNotifySignalKickedOut, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonNotifySignalKickedOut message, length delimited. Does not implicitly {@link AcFunDanmu.CommonNotifySignalKickedOut.verify|verify} messages.
         * @param message CommonNotifySignalKickedOut message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonNotifySignalKickedOut, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonNotifySignalKickedOut message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonNotifySignalKickedOut
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonNotifySignalKickedOut;

        /**
         * Decodes a CommonNotifySignalKickedOut message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonNotifySignalKickedOut
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonNotifySignalKickedOut;

        /**
         * Verifies a CommonNotifySignalKickedOut message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonNotifySignalKickedOut message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonNotifySignalKickedOut
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonNotifySignalKickedOut;

        /**
         * Creates a plain object from a CommonNotifySignalKickedOut message. Also converts values to other types if specified.
         * @param message CommonNotifySignalKickedOut
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonNotifySignalKickedOut, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonNotifySignalKickedOut to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonNotifySignalKickedOut
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonNotifySignalLiveManagerState. */
    interface ICommonNotifySignalLiveManagerState {

        /** CommonNotifySignalLiveManagerState state */
        state?: (AcFunDanmu.CommonNotifySignalLiveManagerState.ManagerState|null);
    }

    /** Represents a CommonNotifySignalLiveManagerState. */
    class CommonNotifySignalLiveManagerState implements ICommonNotifySignalLiveManagerState {

        /**
         * Constructs a new CommonNotifySignalLiveManagerState.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonNotifySignalLiveManagerState);

        /** CommonNotifySignalLiveManagerState state. */
        public state: AcFunDanmu.CommonNotifySignalLiveManagerState.ManagerState;

        /**
         * Creates a new CommonNotifySignalLiveManagerState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonNotifySignalLiveManagerState instance
         */
        public static create(properties?: AcFunDanmu.ICommonNotifySignalLiveManagerState): AcFunDanmu.CommonNotifySignalLiveManagerState;

        /**
         * Encodes the specified CommonNotifySignalLiveManagerState message. Does not implicitly {@link AcFunDanmu.CommonNotifySignalLiveManagerState.verify|verify} messages.
         * @param message CommonNotifySignalLiveManagerState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonNotifySignalLiveManagerState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonNotifySignalLiveManagerState message, length delimited. Does not implicitly {@link AcFunDanmu.CommonNotifySignalLiveManagerState.verify|verify} messages.
         * @param message CommonNotifySignalLiveManagerState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonNotifySignalLiveManagerState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonNotifySignalLiveManagerState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonNotifySignalLiveManagerState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonNotifySignalLiveManagerState;

        /**
         * Decodes a CommonNotifySignalLiveManagerState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonNotifySignalLiveManagerState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonNotifySignalLiveManagerState;

        /**
         * Verifies a CommonNotifySignalLiveManagerState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonNotifySignalLiveManagerState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonNotifySignalLiveManagerState
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonNotifySignalLiveManagerState;

        /**
         * Creates a plain object from a CommonNotifySignalLiveManagerState message. Also converts values to other types if specified.
         * @param message CommonNotifySignalLiveManagerState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonNotifySignalLiveManagerState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonNotifySignalLiveManagerState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonNotifySignalLiveManagerState
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CommonNotifySignalLiveManagerState {

        /** ManagerState enum. */
        enum ManagerState {
            MANAGER_STATE_UNKNOWN = 0,
            MANAGER_ADDED = 1,
            MANAGER_REMOVED = 2,
            IS_MANAGER = 3
        }
    }

    /** Properties of a CommonNotifySignalRemoveApplyUser. */
    interface ICommonNotifySignalRemoveApplyUser {

        /** CommonNotifySignalRemoveApplyUser a */
        a?: (number|Long|null);

        /** CommonNotifySignalRemoveApplyUser b */
        b?: (AcFunDanmu.CommonNotifySignalRemoveApplyUser.unknown|null);
    }

    /** Represents a CommonNotifySignalRemoveApplyUser. */
    class CommonNotifySignalRemoveApplyUser implements ICommonNotifySignalRemoveApplyUser {

        /**
         * Constructs a new CommonNotifySignalRemoveApplyUser.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonNotifySignalRemoveApplyUser);

        /** CommonNotifySignalRemoveApplyUser a. */
        public a: (number|Long);

        /** CommonNotifySignalRemoveApplyUser b. */
        public b: AcFunDanmu.CommonNotifySignalRemoveApplyUser.unknown;

        /**
         * Creates a new CommonNotifySignalRemoveApplyUser instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonNotifySignalRemoveApplyUser instance
         */
        public static create(properties?: AcFunDanmu.ICommonNotifySignalRemoveApplyUser): AcFunDanmu.CommonNotifySignalRemoveApplyUser;

        /**
         * Encodes the specified CommonNotifySignalRemoveApplyUser message. Does not implicitly {@link AcFunDanmu.CommonNotifySignalRemoveApplyUser.verify|verify} messages.
         * @param message CommonNotifySignalRemoveApplyUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonNotifySignalRemoveApplyUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonNotifySignalRemoveApplyUser message, length delimited. Does not implicitly {@link AcFunDanmu.CommonNotifySignalRemoveApplyUser.verify|verify} messages.
         * @param message CommonNotifySignalRemoveApplyUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonNotifySignalRemoveApplyUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonNotifySignalRemoveApplyUser message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonNotifySignalRemoveApplyUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonNotifySignalRemoveApplyUser;

        /**
         * Decodes a CommonNotifySignalRemoveApplyUser message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonNotifySignalRemoveApplyUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonNotifySignalRemoveApplyUser;

        /**
         * Verifies a CommonNotifySignalRemoveApplyUser message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonNotifySignalRemoveApplyUser message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonNotifySignalRemoveApplyUser
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonNotifySignalRemoveApplyUser;

        /**
         * Creates a plain object from a CommonNotifySignalRemoveApplyUser message. Also converts values to other types if specified.
         * @param message CommonNotifySignalRemoveApplyUser
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonNotifySignalRemoveApplyUser, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonNotifySignalRemoveApplyUser to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonNotifySignalRemoveApplyUser
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CommonNotifySignalRemoveApplyUser {

        /** unknown enum. */
        enum unknown {
            c = 0,
            d = 1,
            e = 2,
            f = 3
        }
    }

    /** Properties of a CommonNotifySignalViolationAlert. */
    interface ICommonNotifySignalViolationAlert {

        /** CommonNotifySignalViolationAlert violationContent */
        violationContent?: (string|null);

        /** CommonNotifySignalViolationAlert b */
        b?: (string|null);
    }

    /** Represents a CommonNotifySignalViolationAlert. */
    class CommonNotifySignalViolationAlert implements ICommonNotifySignalViolationAlert {

        /**
         * Constructs a new CommonNotifySignalViolationAlert.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonNotifySignalViolationAlert);

        /** CommonNotifySignalViolationAlert violationContent. */
        public violationContent: string;

        /** CommonNotifySignalViolationAlert b. */
        public b: string;

        /**
         * Creates a new CommonNotifySignalViolationAlert instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonNotifySignalViolationAlert instance
         */
        public static create(properties?: AcFunDanmu.ICommonNotifySignalViolationAlert): AcFunDanmu.CommonNotifySignalViolationAlert;

        /**
         * Encodes the specified CommonNotifySignalViolationAlert message. Does not implicitly {@link AcFunDanmu.CommonNotifySignalViolationAlert.verify|verify} messages.
         * @param message CommonNotifySignalViolationAlert message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonNotifySignalViolationAlert, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonNotifySignalViolationAlert message, length delimited. Does not implicitly {@link AcFunDanmu.CommonNotifySignalViolationAlert.verify|verify} messages.
         * @param message CommonNotifySignalViolationAlert message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonNotifySignalViolationAlert, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonNotifySignalViolationAlert message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonNotifySignalViolationAlert
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonNotifySignalViolationAlert;

        /**
         * Decodes a CommonNotifySignalViolationAlert message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonNotifySignalViolationAlert
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonNotifySignalViolationAlert;

        /**
         * Verifies a CommonNotifySignalViolationAlert message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonNotifySignalViolationAlert message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonNotifySignalViolationAlert
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonNotifySignalViolationAlert;

        /**
         * Creates a plain object from a CommonNotifySignalViolationAlert message. Also converts values to other types if specified.
         * @param message CommonNotifySignalViolationAlert
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonNotifySignalViolationAlert, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonNotifySignalViolationAlert to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonNotifySignalViolationAlert
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalAuthorChatAccept. */
    interface ICommonStateSignalAuthorChatAccept {

        /** CommonStateSignalAuthorChatAccept authorChatId */
        authorChatId?: (string|null);

        /** CommonStateSignalAuthorChatAccept aryaSignalInfo */
        aryaSignalInfo?: (string|null);
    }

    /** Represents a CommonStateSignalAuthorChatAccept. */
    class CommonStateSignalAuthorChatAccept implements ICommonStateSignalAuthorChatAccept {

        /**
         * Constructs a new CommonStateSignalAuthorChatAccept.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalAuthorChatAccept);

        /** CommonStateSignalAuthorChatAccept authorChatId. */
        public authorChatId: string;

        /** CommonStateSignalAuthorChatAccept aryaSignalInfo. */
        public aryaSignalInfo: string;

        /**
         * Creates a new CommonStateSignalAuthorChatAccept instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalAuthorChatAccept instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalAuthorChatAccept): AcFunDanmu.CommonStateSignalAuthorChatAccept;

        /**
         * Encodes the specified CommonStateSignalAuthorChatAccept message. Does not implicitly {@link AcFunDanmu.CommonStateSignalAuthorChatAccept.verify|verify} messages.
         * @param message CommonStateSignalAuthorChatAccept message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalAuthorChatAccept, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalAuthorChatAccept message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalAuthorChatAccept.verify|verify} messages.
         * @param message CommonStateSignalAuthorChatAccept message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalAuthorChatAccept, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalAuthorChatAccept message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalAuthorChatAccept
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalAuthorChatAccept;

        /**
         * Decodes a CommonStateSignalAuthorChatAccept message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalAuthorChatAccept
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalAuthorChatAccept;

        /**
         * Verifies a CommonStateSignalAuthorChatAccept message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalAuthorChatAccept message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalAuthorChatAccept
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalAuthorChatAccept;

        /**
         * Creates a plain object from a CommonStateSignalAuthorChatAccept message. Also converts values to other types if specified.
         * @param message CommonStateSignalAuthorChatAccept
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalAuthorChatAccept, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalAuthorChatAccept to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalAuthorChatAccept
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalAuthorChatCall. */
    interface ICommonStateSignalAuthorChatCall {

        /** CommonStateSignalAuthorChatCall authorChatId */
        authorChatId?: (string|null);

        /** CommonStateSignalAuthorChatCall inviterUserInfo */
        inviterUserInfo?: (AcFunDanmu.IAuthorChatPlayerInfo|null);

        /** CommonStateSignalAuthorChatCall callTimestampMs */
        callTimestampMs?: (number|Long|null);
    }

    /** Represents a CommonStateSignalAuthorChatCall. */
    class CommonStateSignalAuthorChatCall implements ICommonStateSignalAuthorChatCall {

        /**
         * Constructs a new CommonStateSignalAuthorChatCall.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalAuthorChatCall);

        /** CommonStateSignalAuthorChatCall authorChatId. */
        public authorChatId: string;

        /** CommonStateSignalAuthorChatCall inviterUserInfo. */
        public inviterUserInfo?: (AcFunDanmu.IAuthorChatPlayerInfo|null);

        /** CommonStateSignalAuthorChatCall callTimestampMs. */
        public callTimestampMs: (number|Long);

        /**
         * Creates a new CommonStateSignalAuthorChatCall instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalAuthorChatCall instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalAuthorChatCall): AcFunDanmu.CommonStateSignalAuthorChatCall;

        /**
         * Encodes the specified CommonStateSignalAuthorChatCall message. Does not implicitly {@link AcFunDanmu.CommonStateSignalAuthorChatCall.verify|verify} messages.
         * @param message CommonStateSignalAuthorChatCall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalAuthorChatCall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalAuthorChatCall message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalAuthorChatCall.verify|verify} messages.
         * @param message CommonStateSignalAuthorChatCall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalAuthorChatCall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalAuthorChatCall message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalAuthorChatCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalAuthorChatCall;

        /**
         * Decodes a CommonStateSignalAuthorChatCall message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalAuthorChatCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalAuthorChatCall;

        /**
         * Verifies a CommonStateSignalAuthorChatCall message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalAuthorChatCall message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalAuthorChatCall
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalAuthorChatCall;

        /**
         * Creates a plain object from a CommonStateSignalAuthorChatCall message. Also converts values to other types if specified.
         * @param message CommonStateSignalAuthorChatCall
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalAuthorChatCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalAuthorChatCall to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalAuthorChatCall
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalAuthorChatChangeSoundConfig. */
    interface ICommonStateSignalAuthorChatChangeSoundConfig {

        /** CommonStateSignalAuthorChatChangeSoundConfig authorChatId */
        authorChatId?: (string|null);

        /** CommonStateSignalAuthorChatChangeSoundConfig soundConfigChangeType */
        soundConfigChangeType?: (AcFunDanmu.CommonStateSignalAuthorChatChangeSoundConfig.SoundConfigChangeType|null);
    }

    /** Represents a CommonStateSignalAuthorChatChangeSoundConfig. */
    class CommonStateSignalAuthorChatChangeSoundConfig implements ICommonStateSignalAuthorChatChangeSoundConfig {

        /**
         * Constructs a new CommonStateSignalAuthorChatChangeSoundConfig.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalAuthorChatChangeSoundConfig);

        /** CommonStateSignalAuthorChatChangeSoundConfig authorChatId. */
        public authorChatId: string;

        /** CommonStateSignalAuthorChatChangeSoundConfig soundConfigChangeType. */
        public soundConfigChangeType: AcFunDanmu.CommonStateSignalAuthorChatChangeSoundConfig.SoundConfigChangeType;

        /**
         * Creates a new CommonStateSignalAuthorChatChangeSoundConfig instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalAuthorChatChangeSoundConfig instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalAuthorChatChangeSoundConfig): AcFunDanmu.CommonStateSignalAuthorChatChangeSoundConfig;

        /**
         * Encodes the specified CommonStateSignalAuthorChatChangeSoundConfig message. Does not implicitly {@link AcFunDanmu.CommonStateSignalAuthorChatChangeSoundConfig.verify|verify} messages.
         * @param message CommonStateSignalAuthorChatChangeSoundConfig message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalAuthorChatChangeSoundConfig, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalAuthorChatChangeSoundConfig message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalAuthorChatChangeSoundConfig.verify|verify} messages.
         * @param message CommonStateSignalAuthorChatChangeSoundConfig message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalAuthorChatChangeSoundConfig, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalAuthorChatChangeSoundConfig message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalAuthorChatChangeSoundConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalAuthorChatChangeSoundConfig;

        /**
         * Decodes a CommonStateSignalAuthorChatChangeSoundConfig message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalAuthorChatChangeSoundConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalAuthorChatChangeSoundConfig;

        /**
         * Verifies a CommonStateSignalAuthorChatChangeSoundConfig message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalAuthorChatChangeSoundConfig message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalAuthorChatChangeSoundConfig
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalAuthorChatChangeSoundConfig;

        /**
         * Creates a plain object from a CommonStateSignalAuthorChatChangeSoundConfig message. Also converts values to other types if specified.
         * @param message CommonStateSignalAuthorChatChangeSoundConfig
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalAuthorChatChangeSoundConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalAuthorChatChangeSoundConfig to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalAuthorChatChangeSoundConfig
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CommonStateSignalAuthorChatChangeSoundConfig {

        /** SoundConfigChangeType enum. */
        enum SoundConfigChangeType {
            UNKNOWN = 0,
            OPEN_SOUND = 1,
            CLOSE_SOUND = 2
        }
    }

    /** Properties of a CommonStateSignalAuthorChatEnd. */
    interface ICommonStateSignalAuthorChatEnd {

        /** CommonStateSignalAuthorChatEnd authorChatId */
        authorChatId?: (string|null);

        /** CommonStateSignalAuthorChatEnd endType */
        endType?: (AcFunDanmu.CommonStateSignalAuthorChatEnd.EndType|null);

        /** CommonStateSignalAuthorChatEnd endLiveId */
        endLiveId?: (string|null);
    }

    /** Represents a CommonStateSignalAuthorChatEnd. */
    class CommonStateSignalAuthorChatEnd implements ICommonStateSignalAuthorChatEnd {

        /**
         * Constructs a new CommonStateSignalAuthorChatEnd.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalAuthorChatEnd);

        /** CommonStateSignalAuthorChatEnd authorChatId. */
        public authorChatId: string;

        /** CommonStateSignalAuthorChatEnd endType. */
        public endType: AcFunDanmu.CommonStateSignalAuthorChatEnd.EndType;

        /** CommonStateSignalAuthorChatEnd endLiveId. */
        public endLiveId: string;

        /**
         * Creates a new CommonStateSignalAuthorChatEnd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalAuthorChatEnd instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalAuthorChatEnd): AcFunDanmu.CommonStateSignalAuthorChatEnd;

        /**
         * Encodes the specified CommonStateSignalAuthorChatEnd message. Does not implicitly {@link AcFunDanmu.CommonStateSignalAuthorChatEnd.verify|verify} messages.
         * @param message CommonStateSignalAuthorChatEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalAuthorChatEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalAuthorChatEnd message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalAuthorChatEnd.verify|verify} messages.
         * @param message CommonStateSignalAuthorChatEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalAuthorChatEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalAuthorChatEnd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalAuthorChatEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalAuthorChatEnd;

        /**
         * Decodes a CommonStateSignalAuthorChatEnd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalAuthorChatEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalAuthorChatEnd;

        /**
         * Verifies a CommonStateSignalAuthorChatEnd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalAuthorChatEnd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalAuthorChatEnd
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalAuthorChatEnd;

        /**
         * Creates a plain object from a CommonStateSignalAuthorChatEnd message. Also converts values to other types if specified.
         * @param message CommonStateSignalAuthorChatEnd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalAuthorChatEnd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalAuthorChatEnd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalAuthorChatEnd
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CommonStateSignalAuthorChatEnd {

        /** EndType enum. */
        enum EndType {
            UNKNOWN = 0,
            CANCEL_BY_INVITER = 1,
            END_BY_INVITER = 2,
            END_BY_INVITEE = 3,
            INVITEE_REJECT = 4,
            INVITEE_TIMEOUT = 5,
            INVITEE_HEARTBEAT_TIMEOUT = 6,
            INVITER_HEARTBEAT_TIMEOUT = 7,
            PEER_LIVE_STOPPED = 8
        }
    }

    /** Properties of a CommonStateSignalAuthorChatReady. */
    interface ICommonStateSignalAuthorChatReady {

        /** CommonStateSignalAuthorChatReady authorChatId */
        authorChatId?: (string|null);

        /** CommonStateSignalAuthorChatReady inviterUserInfo */
        inviterUserInfo?: (AcFunDanmu.IAuthorChatPlayerInfo|null);

        /** CommonStateSignalAuthorChatReady inviteeUserInfo */
        inviteeUserInfo?: (AcFunDanmu.IAuthorChatPlayerInfo|null);
    }

    /** Represents a CommonStateSignalAuthorChatReady. */
    class CommonStateSignalAuthorChatReady implements ICommonStateSignalAuthorChatReady {

        /**
         * Constructs a new CommonStateSignalAuthorChatReady.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalAuthorChatReady);

        /** CommonStateSignalAuthorChatReady authorChatId. */
        public authorChatId: string;

        /** CommonStateSignalAuthorChatReady inviterUserInfo. */
        public inviterUserInfo?: (AcFunDanmu.IAuthorChatPlayerInfo|null);

        /** CommonStateSignalAuthorChatReady inviteeUserInfo. */
        public inviteeUserInfo?: (AcFunDanmu.IAuthorChatPlayerInfo|null);

        /**
         * Creates a new CommonStateSignalAuthorChatReady instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalAuthorChatReady instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalAuthorChatReady): AcFunDanmu.CommonStateSignalAuthorChatReady;

        /**
         * Encodes the specified CommonStateSignalAuthorChatReady message. Does not implicitly {@link AcFunDanmu.CommonStateSignalAuthorChatReady.verify|verify} messages.
         * @param message CommonStateSignalAuthorChatReady message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalAuthorChatReady, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalAuthorChatReady message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalAuthorChatReady.verify|verify} messages.
         * @param message CommonStateSignalAuthorChatReady message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalAuthorChatReady, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalAuthorChatReady message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalAuthorChatReady
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalAuthorChatReady;

        /**
         * Decodes a CommonStateSignalAuthorChatReady message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalAuthorChatReady
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalAuthorChatReady;

        /**
         * Verifies a CommonStateSignalAuthorChatReady message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalAuthorChatReady message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalAuthorChatReady
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalAuthorChatReady;

        /**
         * Creates a plain object from a CommonStateSignalAuthorChatReady message. Also converts values to other types if specified.
         * @param message CommonStateSignalAuthorChatReady
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalAuthorChatReady, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalAuthorChatReady to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalAuthorChatReady
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalAuthorPause. */
    interface ICommonStateSignalAuthorPause {

        /** CommonStateSignalAuthorPause a */
        a?: (number|Long|null);

        /** CommonStateSignalAuthorPause b */
        b?: (string|null);

        /** CommonStateSignalAuthorPause c */
        c?: (string|null);
    }

    /** Represents a CommonStateSignalAuthorPause. */
    class CommonStateSignalAuthorPause implements ICommonStateSignalAuthorPause {

        /**
         * Constructs a new CommonStateSignalAuthorPause.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalAuthorPause);

        /** CommonStateSignalAuthorPause a. */
        public a: (number|Long);

        /** CommonStateSignalAuthorPause b. */
        public b: string;

        /** CommonStateSignalAuthorPause c. */
        public c: string;

        /**
         * Creates a new CommonStateSignalAuthorPause instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalAuthorPause instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalAuthorPause): AcFunDanmu.CommonStateSignalAuthorPause;

        /**
         * Encodes the specified CommonStateSignalAuthorPause message. Does not implicitly {@link AcFunDanmu.CommonStateSignalAuthorPause.verify|verify} messages.
         * @param message CommonStateSignalAuthorPause message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalAuthorPause, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalAuthorPause message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalAuthorPause.verify|verify} messages.
         * @param message CommonStateSignalAuthorPause message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalAuthorPause, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalAuthorPause message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalAuthorPause
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalAuthorPause;

        /**
         * Decodes a CommonStateSignalAuthorPause message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalAuthorPause
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalAuthorPause;

        /**
         * Verifies a CommonStateSignalAuthorPause message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalAuthorPause message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalAuthorPause
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalAuthorPause;

        /**
         * Creates a plain object from a CommonStateSignalAuthorPause message. Also converts values to other types if specified.
         * @param message CommonStateSignalAuthorPause
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalAuthorPause, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalAuthorPause to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalAuthorPause
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalAuthorResume. */
    interface ICommonStateSignalAuthorResume {

        /** CommonStateSignalAuthorResume a */
        a?: (number|Long|null);
    }

    /** Represents a CommonStateSignalAuthorResume. */
    class CommonStateSignalAuthorResume implements ICommonStateSignalAuthorResume {

        /**
         * Constructs a new CommonStateSignalAuthorResume.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalAuthorResume);

        /** CommonStateSignalAuthorResume a. */
        public a: (number|Long);

        /**
         * Creates a new CommonStateSignalAuthorResume instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalAuthorResume instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalAuthorResume): AcFunDanmu.CommonStateSignalAuthorResume;

        /**
         * Encodes the specified CommonStateSignalAuthorResume message. Does not implicitly {@link AcFunDanmu.CommonStateSignalAuthorResume.verify|verify} messages.
         * @param message CommonStateSignalAuthorResume message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalAuthorResume, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalAuthorResume message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalAuthorResume.verify|verify} messages.
         * @param message CommonStateSignalAuthorResume message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalAuthorResume, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalAuthorResume message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalAuthorResume
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalAuthorResume;

        /**
         * Decodes a CommonStateSignalAuthorResume message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalAuthorResume
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalAuthorResume;

        /**
         * Verifies a CommonStateSignalAuthorResume message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalAuthorResume message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalAuthorResume
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalAuthorResume;

        /**
         * Creates a plain object from a CommonStateSignalAuthorResume message. Also converts values to other types if specified.
         * @param message CommonStateSignalAuthorResume
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalAuthorResume, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalAuthorResume to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalAuthorResume
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalChatAccept. */
    interface ICommonStateSignalChatAccept {

        /** CommonStateSignalChatAccept chatId */
        chatId?: (string|null);

        /** CommonStateSignalChatAccept mediaType */
        mediaType?: (AcFunDanmu.ChatMediaType|null);

        /** CommonStateSignalChatAccept aryaSignalInfo */
        aryaSignalInfo?: (string|null);
    }

    /** Represents a CommonStateSignalChatAccept. */
    class CommonStateSignalChatAccept implements ICommonStateSignalChatAccept {

        /**
         * Constructs a new CommonStateSignalChatAccept.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalChatAccept);

        /** CommonStateSignalChatAccept chatId. */
        public chatId: string;

        /** CommonStateSignalChatAccept mediaType. */
        public mediaType: AcFunDanmu.ChatMediaType;

        /** CommonStateSignalChatAccept aryaSignalInfo. */
        public aryaSignalInfo: string;

        /**
         * Creates a new CommonStateSignalChatAccept instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalChatAccept instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalChatAccept): AcFunDanmu.CommonStateSignalChatAccept;

        /**
         * Encodes the specified CommonStateSignalChatAccept message. Does not implicitly {@link AcFunDanmu.CommonStateSignalChatAccept.verify|verify} messages.
         * @param message CommonStateSignalChatAccept message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalChatAccept, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalChatAccept message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalChatAccept.verify|verify} messages.
         * @param message CommonStateSignalChatAccept message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalChatAccept, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalChatAccept message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalChatAccept
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalChatAccept;

        /**
         * Decodes a CommonStateSignalChatAccept message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalChatAccept
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalChatAccept;

        /**
         * Verifies a CommonStateSignalChatAccept message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalChatAccept message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalChatAccept
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalChatAccept;

        /**
         * Creates a plain object from a CommonStateSignalChatAccept message. Also converts values to other types if specified.
         * @param message CommonStateSignalChatAccept
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalChatAccept, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalChatAccept to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalChatAccept
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalChatCall. */
    interface ICommonStateSignalChatCall {

        /** CommonStateSignalChatCall chatId */
        chatId?: (string|null);

        /** CommonStateSignalChatCall liveId */
        liveId?: (string|null);

        /** CommonStateSignalChatCall callTimestampMs */
        callTimestampMs?: (number|Long|null);

        /** CommonStateSignalChatCall mediaType */
        mediaType?: (AcFunDanmu.ChatMediaType|null);
    }

    /** Represents a CommonStateSignalChatCall. */
    class CommonStateSignalChatCall implements ICommonStateSignalChatCall {

        /**
         * Constructs a new CommonStateSignalChatCall.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalChatCall);

        /** CommonStateSignalChatCall chatId. */
        public chatId: string;

        /** CommonStateSignalChatCall liveId. */
        public liveId: string;

        /** CommonStateSignalChatCall callTimestampMs. */
        public callTimestampMs: (number|Long);

        /** CommonStateSignalChatCall mediaType. */
        public mediaType: AcFunDanmu.ChatMediaType;

        /**
         * Creates a new CommonStateSignalChatCall instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalChatCall instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalChatCall): AcFunDanmu.CommonStateSignalChatCall;

        /**
         * Encodes the specified CommonStateSignalChatCall message. Does not implicitly {@link AcFunDanmu.CommonStateSignalChatCall.verify|verify} messages.
         * @param message CommonStateSignalChatCall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalChatCall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalChatCall message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalChatCall.verify|verify} messages.
         * @param message CommonStateSignalChatCall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalChatCall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalChatCall message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalChatCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalChatCall;

        /**
         * Decodes a CommonStateSignalChatCall message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalChatCall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalChatCall;

        /**
         * Verifies a CommonStateSignalChatCall message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalChatCall message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalChatCall
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalChatCall;

        /**
         * Creates a plain object from a CommonStateSignalChatCall message. Also converts values to other types if specified.
         * @param message CommonStateSignalChatCall
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalChatCall, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalChatCall to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalChatCall
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalChatEnd. */
    interface ICommonStateSignalChatEnd {

        /** CommonStateSignalChatEnd chatId */
        chatId?: (string|null);

        /** CommonStateSignalChatEnd endType */
        endType?: (AcFunDanmu.CommonStateSignalChatEnd.EndType|null);

        /** CommonStateSignalChatEnd c */
        c?: (AcFunDanmu.CommonStateSignalChatEnd.IBannedInfo|null);
    }

    /** Represents a CommonStateSignalChatEnd. */
    class CommonStateSignalChatEnd implements ICommonStateSignalChatEnd {

        /**
         * Constructs a new CommonStateSignalChatEnd.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalChatEnd);

        /** CommonStateSignalChatEnd chatId. */
        public chatId: string;

        /** CommonStateSignalChatEnd endType. */
        public endType: AcFunDanmu.CommonStateSignalChatEnd.EndType;

        /** CommonStateSignalChatEnd c. */
        public c?: (AcFunDanmu.CommonStateSignalChatEnd.IBannedInfo|null);

        /**
         * Creates a new CommonStateSignalChatEnd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalChatEnd instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalChatEnd): AcFunDanmu.CommonStateSignalChatEnd;

        /**
         * Encodes the specified CommonStateSignalChatEnd message. Does not implicitly {@link AcFunDanmu.CommonStateSignalChatEnd.verify|verify} messages.
         * @param message CommonStateSignalChatEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalChatEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalChatEnd message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalChatEnd.verify|verify} messages.
         * @param message CommonStateSignalChatEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalChatEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalChatEnd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalChatEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalChatEnd;

        /**
         * Decodes a CommonStateSignalChatEnd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalChatEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalChatEnd;

        /**
         * Verifies a CommonStateSignalChatEnd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalChatEnd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalChatEnd
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalChatEnd;

        /**
         * Creates a plain object from a CommonStateSignalChatEnd message. Also converts values to other types if specified.
         * @param message CommonStateSignalChatEnd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalChatEnd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalChatEnd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalChatEnd
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CommonStateSignalChatEnd {

        /** EndType enum. */
        enum EndType {
            UNKNOWN = 0,
            CANCEL_BY_AUTHOR = 1,
            END_BY_AUTHOR = 2,
            END_BY_GUEST = 3,
            GUEST_REJECT = 4,
            GUEST_TIMEOUT = 5,
            GUEST_HEARTBEAT_TIMEOUT = 6,
            AUTHOR_HEARTBEAT_TIMEOUT = 7,
            PEER_LIVE_STOPPED = 8
        }

        /** Properties of a BannedInfo. */
        interface IBannedInfo {

            /** BannedInfo a */
            a?: (string|null);

            /** BannedInfo b */
            b?: (string|null);

            /** BannedInfo c */
            c?: (string|null);

            /** BannedInfo d */
            d?: (string|null);
        }

        /** Represents a BannedInfo. */
        class BannedInfo implements IBannedInfo {

            /**
             * Constructs a new BannedInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: AcFunDanmu.CommonStateSignalChatEnd.IBannedInfo);

            /** BannedInfo a. */
            public a: string;

            /** BannedInfo b. */
            public b: string;

            /** BannedInfo c. */
            public c: string;

            /** BannedInfo d. */
            public d: string;

            /**
             * Creates a new BannedInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BannedInfo instance
             */
            public static create(properties?: AcFunDanmu.CommonStateSignalChatEnd.IBannedInfo): AcFunDanmu.CommonStateSignalChatEnd.BannedInfo;

            /**
             * Encodes the specified BannedInfo message. Does not implicitly {@link AcFunDanmu.CommonStateSignalChatEnd.BannedInfo.verify|verify} messages.
             * @param message BannedInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AcFunDanmu.CommonStateSignalChatEnd.IBannedInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BannedInfo message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalChatEnd.BannedInfo.verify|verify} messages.
             * @param message BannedInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AcFunDanmu.CommonStateSignalChatEnd.IBannedInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BannedInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BannedInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalChatEnd.BannedInfo;

            /**
             * Decodes a BannedInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BannedInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalChatEnd.BannedInfo;

            /**
             * Verifies a BannedInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BannedInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BannedInfo
             */
            public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalChatEnd.BannedInfo;

            /**
             * Creates a plain object from a BannedInfo message. Also converts values to other types if specified.
             * @param message BannedInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AcFunDanmu.CommonStateSignalChatEnd.BannedInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BannedInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BannedInfo
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a CommonStateSignalChatReady. */
    interface ICommonStateSignalChatReady {

        /** CommonStateSignalChatReady chatId */
        chatId?: (string|null);

        /** CommonStateSignalChatReady guestUserInfo */
        guestUserInfo?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** CommonStateSignalChatReady mediaType */
        mediaType?: (AcFunDanmu.ChatMediaType|null);
    }

    /** Represents a CommonStateSignalChatReady. */
    class CommonStateSignalChatReady implements ICommonStateSignalChatReady {

        /**
         * Constructs a new CommonStateSignalChatReady.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalChatReady);

        /** CommonStateSignalChatReady chatId. */
        public chatId: string;

        /** CommonStateSignalChatReady guestUserInfo. */
        public guestUserInfo?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** CommonStateSignalChatReady mediaType. */
        public mediaType: AcFunDanmu.ChatMediaType;

        /**
         * Creates a new CommonStateSignalChatReady instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalChatReady instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalChatReady): AcFunDanmu.CommonStateSignalChatReady;

        /**
         * Encodes the specified CommonStateSignalChatReady message. Does not implicitly {@link AcFunDanmu.CommonStateSignalChatReady.verify|verify} messages.
         * @param message CommonStateSignalChatReady message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalChatReady, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalChatReady message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalChatReady.verify|verify} messages.
         * @param message CommonStateSignalChatReady message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalChatReady, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalChatReady message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalChatReady
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalChatReady;

        /**
         * Decodes a CommonStateSignalChatReady message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalChatReady
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalChatReady;

        /**
         * Verifies a CommonStateSignalChatReady message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalChatReady message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalChatReady
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalChatReady;

        /**
         * Creates a plain object from a CommonStateSignalChatReady message. Also converts values to other types if specified.
         * @param message CommonStateSignalChatReady
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalChatReady, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalChatReady to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalChatReady
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalCurrentRedpackList. */
    interface ICommonStateSignalCurrentRedpackList {

        /** CommonStateSignalCurrentRedpackList redpacks */
        redpacks?: (AcFunDanmu.CommonStateSignalCurrentRedpackList.IRedpack[]|null);
    }

    /** Represents a CommonStateSignalCurrentRedpackList. */
    class CommonStateSignalCurrentRedpackList implements ICommonStateSignalCurrentRedpackList {

        /**
         * Constructs a new CommonStateSignalCurrentRedpackList.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalCurrentRedpackList);

        /** CommonStateSignalCurrentRedpackList redpacks. */
        public redpacks: AcFunDanmu.CommonStateSignalCurrentRedpackList.IRedpack[];

        /**
         * Creates a new CommonStateSignalCurrentRedpackList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalCurrentRedpackList instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalCurrentRedpackList): AcFunDanmu.CommonStateSignalCurrentRedpackList;

        /**
         * Encodes the specified CommonStateSignalCurrentRedpackList message. Does not implicitly {@link AcFunDanmu.CommonStateSignalCurrentRedpackList.verify|verify} messages.
         * @param message CommonStateSignalCurrentRedpackList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalCurrentRedpackList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalCurrentRedpackList message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalCurrentRedpackList.verify|verify} messages.
         * @param message CommonStateSignalCurrentRedpackList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalCurrentRedpackList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalCurrentRedpackList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalCurrentRedpackList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalCurrentRedpackList;

        /**
         * Decodes a CommonStateSignalCurrentRedpackList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalCurrentRedpackList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalCurrentRedpackList;

        /**
         * Verifies a CommonStateSignalCurrentRedpackList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalCurrentRedpackList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalCurrentRedpackList
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalCurrentRedpackList;

        /**
         * Creates a plain object from a CommonStateSignalCurrentRedpackList message. Also converts values to other types if specified.
         * @param message CommonStateSignalCurrentRedpackList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalCurrentRedpackList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalCurrentRedpackList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalCurrentRedpackList
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CommonStateSignalCurrentRedpackList {

        /** RedpackDisplayStatus enum. */
        enum RedpackDisplayStatus {
            SHOW = 0,
            GET_TOKEN = 1,
            GRAB = 2,
            e = 3
        }

        /** Properties of a Redpack. */
        interface IRedpack {

            /** Redpack sender */
            sender?: (AcFunDanmu.IZtLiveUserInfo|null);

            /** Redpack displayStatus */
            displayStatus?: (AcFunDanmu.CommonStateSignalCurrentRedpackList.RedpackDisplayStatus|null);

            /** Redpack grabBeginTimeMs */
            grabBeginTimeMs?: (number|Long|null);

            /** Redpack getTokenLatestTimeMs */
            getTokenLatestTimeMs?: (number|Long|null);

            /** Redpack redPackId */
            redPackId?: (string|null);

            /** Redpack redpackBizUnit */
            redpackBizUnit?: (string|null);

            /** Redpack redpackAmount */
            redpackAmount?: (number|Long|null);

            /** Redpack settleBeginTime */
            settleBeginTime?: (number|Long|null);

            /** Redpack i */
            i?: (number|Long|null);
        }

        /** Represents a Redpack. */
        class Redpack implements IRedpack {

            /**
             * Constructs a new Redpack.
             * @param [properties] Properties to set
             */
            constructor(properties?: AcFunDanmu.CommonStateSignalCurrentRedpackList.IRedpack);

            /** Redpack sender. */
            public sender?: (AcFunDanmu.IZtLiveUserInfo|null);

            /** Redpack displayStatus. */
            public displayStatus: AcFunDanmu.CommonStateSignalCurrentRedpackList.RedpackDisplayStatus;

            /** Redpack grabBeginTimeMs. */
            public grabBeginTimeMs: (number|Long);

            /** Redpack getTokenLatestTimeMs. */
            public getTokenLatestTimeMs: (number|Long);

            /** Redpack redPackId. */
            public redPackId: string;

            /** Redpack redpackBizUnit. */
            public redpackBizUnit: string;

            /** Redpack redpackAmount. */
            public redpackAmount: (number|Long);

            /** Redpack settleBeginTime. */
            public settleBeginTime: (number|Long);

            /** Redpack i. */
            public i: (number|Long);

            /**
             * Creates a new Redpack instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Redpack instance
             */
            public static create(properties?: AcFunDanmu.CommonStateSignalCurrentRedpackList.IRedpack): AcFunDanmu.CommonStateSignalCurrentRedpackList.Redpack;

            /**
             * Encodes the specified Redpack message. Does not implicitly {@link AcFunDanmu.CommonStateSignalCurrentRedpackList.Redpack.verify|verify} messages.
             * @param message Redpack message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AcFunDanmu.CommonStateSignalCurrentRedpackList.IRedpack, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Redpack message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalCurrentRedpackList.Redpack.verify|verify} messages.
             * @param message Redpack message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AcFunDanmu.CommonStateSignalCurrentRedpackList.IRedpack, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Redpack message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Redpack
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalCurrentRedpackList.Redpack;

            /**
             * Decodes a Redpack message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Redpack
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalCurrentRedpackList.Redpack;

            /**
             * Verifies a Redpack message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Redpack message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Redpack
             */
            public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalCurrentRedpackList.Redpack;

            /**
             * Creates a plain object from a Redpack message. Also converts values to other types if specified.
             * @param message Redpack
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AcFunDanmu.CommonStateSignalCurrentRedpackList.Redpack, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Redpack to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Redpack
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a CommonStateSignalDisplayInfo. */
    interface ICommonStateSignalDisplayInfo {

        /** CommonStateSignalDisplayInfo watchingCount */
        watchingCount?: (string|null);

        /** CommonStateSignalDisplayInfo likeCount */
        likeCount?: (string|null);

        /** CommonStateSignalDisplayInfo likeDelta */
        likeDelta?: (number|null);
    }

    /** Represents a CommonStateSignalDisplayInfo. */
    class CommonStateSignalDisplayInfo implements ICommonStateSignalDisplayInfo {

        /**
         * Constructs a new CommonStateSignalDisplayInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalDisplayInfo);

        /** CommonStateSignalDisplayInfo watchingCount. */
        public watchingCount: string;

        /** CommonStateSignalDisplayInfo likeCount. */
        public likeCount: string;

        /** CommonStateSignalDisplayInfo likeDelta. */
        public likeDelta: number;

        /**
         * Creates a new CommonStateSignalDisplayInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalDisplayInfo instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalDisplayInfo): AcFunDanmu.CommonStateSignalDisplayInfo;

        /**
         * Encodes the specified CommonStateSignalDisplayInfo message. Does not implicitly {@link AcFunDanmu.CommonStateSignalDisplayInfo.verify|verify} messages.
         * @param message CommonStateSignalDisplayInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalDisplayInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalDisplayInfo message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalDisplayInfo.verify|verify} messages.
         * @param message CommonStateSignalDisplayInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalDisplayInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalDisplayInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalDisplayInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalDisplayInfo;

        /**
         * Decodes a CommonStateSignalDisplayInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalDisplayInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalDisplayInfo;

        /**
         * Verifies a CommonStateSignalDisplayInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalDisplayInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalDisplayInfo
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalDisplayInfo;

        /**
         * Creates a plain object from a CommonStateSignalDisplayInfo message. Also converts values to other types if specified.
         * @param message CommonStateSignalDisplayInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalDisplayInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalDisplayInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalDisplayInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalFeatureStateSync. */
    interface ICommonStateSignalFeatureStateSync {

        /** CommonStateSignalFeatureStateSync featureState */
        featureState?: (AcFunDanmu.ILiveFeatureState[]|null);
    }

    /** Represents a CommonStateSignalFeatureStateSync. */
    class CommonStateSignalFeatureStateSync implements ICommonStateSignalFeatureStateSync {

        /**
         * Constructs a new CommonStateSignalFeatureStateSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalFeatureStateSync);

        /** CommonStateSignalFeatureStateSync featureState. */
        public featureState: AcFunDanmu.ILiveFeatureState[];

        /**
         * Creates a new CommonStateSignalFeatureStateSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalFeatureStateSync instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalFeatureStateSync): AcFunDanmu.CommonStateSignalFeatureStateSync;

        /**
         * Encodes the specified CommonStateSignalFeatureStateSync message. Does not implicitly {@link AcFunDanmu.CommonStateSignalFeatureStateSync.verify|verify} messages.
         * @param message CommonStateSignalFeatureStateSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalFeatureStateSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalFeatureStateSync message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalFeatureStateSync.verify|verify} messages.
         * @param message CommonStateSignalFeatureStateSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalFeatureStateSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalFeatureStateSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalFeatureStateSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalFeatureStateSync;

        /**
         * Decodes a CommonStateSignalFeatureStateSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalFeatureStateSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalFeatureStateSync;

        /**
         * Verifies a CommonStateSignalFeatureStateSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalFeatureStateSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalFeatureStateSync
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalFeatureStateSync;

        /**
         * Creates a plain object from a CommonStateSignalFeatureStateSync message. Also converts values to other types if specified.
         * @param message CommonStateSignalFeatureStateSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalFeatureStateSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalFeatureStateSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalFeatureStateSync
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a LiveFeatureState. */
    interface ILiveFeatureState {

        /** LiveFeatureState type */
        type?: (AcFunDanmu.LiveFeatureState.FeatureType|null);

        /** LiveFeatureState state */
        state?: (AcFunDanmu.LiveFeatureState.FeatureState|null);
    }

    /** Represents a LiveFeatureState. */
    class LiveFeatureState implements ILiveFeatureState {

        /**
         * Constructs a new LiveFeatureState.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ILiveFeatureState);

        /** LiveFeatureState type. */
        public type: AcFunDanmu.LiveFeatureState.FeatureType;

        /** LiveFeatureState state. */
        public state: AcFunDanmu.LiveFeatureState.FeatureState;

        /**
         * Creates a new LiveFeatureState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LiveFeatureState instance
         */
        public static create(properties?: AcFunDanmu.ILiveFeatureState): AcFunDanmu.LiveFeatureState;

        /**
         * Encodes the specified LiveFeatureState message. Does not implicitly {@link AcFunDanmu.LiveFeatureState.verify|verify} messages.
         * @param message LiveFeatureState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ILiveFeatureState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LiveFeatureState message, length delimited. Does not implicitly {@link AcFunDanmu.LiveFeatureState.verify|verify} messages.
         * @param message LiveFeatureState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ILiveFeatureState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LiveFeatureState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LiveFeatureState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.LiveFeatureState;

        /**
         * Decodes a LiveFeatureState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LiveFeatureState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.LiveFeatureState;

        /**
         * Verifies a LiveFeatureState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LiveFeatureState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LiveFeatureState
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.LiveFeatureState;

        /**
         * Creates a plain object from a LiveFeatureState message. Also converts values to other types if specified.
         * @param message LiveFeatureState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.LiveFeatureState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LiveFeatureState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for LiveFeatureState
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace LiveFeatureState {

        /** FeatureType enum. */
        enum FeatureType {
            FEATURE_UNKNOWN = 0,
            LANDSCAPE_COMMENT = 1
        }

        /** FeatureState enum. */
        enum FeatureState {
            FEATURE_STATE_UNKNOWN = 0,
            FEATURE_STATE_OPEND = 1,
            FEATURE_STATE_CLOSED = 2
        }
    }

    /** Properties of a CommonStateSignalLiveState. */
    interface ICommonStateSignalLiveState {

        /** CommonStateSignalLiveState a */
        a?: (number|null);

        /** CommonStateSignalLiveState b */
        b?: (number|null);

        /** CommonStateSignalLiveState c */
        c?: (string|null);
    }

    /** Represents a CommonStateSignalLiveState. */
    class CommonStateSignalLiveState implements ICommonStateSignalLiveState {

        /**
         * Constructs a new CommonStateSignalLiveState.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalLiveState);

        /** CommonStateSignalLiveState a. */
        public a: number;

        /** CommonStateSignalLiveState b. */
        public b: number;

        /** CommonStateSignalLiveState c. */
        public c: string;

        /**
         * Creates a new CommonStateSignalLiveState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalLiveState instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalLiveState): AcFunDanmu.CommonStateSignalLiveState;

        /**
         * Encodes the specified CommonStateSignalLiveState message. Does not implicitly {@link AcFunDanmu.CommonStateSignalLiveState.verify|verify} messages.
         * @param message CommonStateSignalLiveState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalLiveState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalLiveState message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalLiveState.verify|verify} messages.
         * @param message CommonStateSignalLiveState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalLiveState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalLiveState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalLiveState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalLiveState;

        /**
         * Decodes a CommonStateSignalLiveState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalLiveState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalLiveState;

        /**
         * Verifies a CommonStateSignalLiveState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalLiveState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalLiveState
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalLiveState;

        /**
         * Creates a plain object from a CommonStateSignalLiveState message. Also converts values to other types if specified.
         * @param message CommonStateSignalLiveState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalLiveState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalLiveState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalLiveState
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalNewApplyUser. */
    interface ICommonStateSignalNewApplyUser {

        /** CommonStateSignalNewApplyUser a */
        a?: (number|Long|null);
    }

    /** Represents a CommonStateSignalNewApplyUser. */
    class CommonStateSignalNewApplyUser implements ICommonStateSignalNewApplyUser {

        /**
         * Constructs a new CommonStateSignalNewApplyUser.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalNewApplyUser);

        /** CommonStateSignalNewApplyUser a. */
        public a: (number|Long);

        /**
         * Creates a new CommonStateSignalNewApplyUser instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalNewApplyUser instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalNewApplyUser): AcFunDanmu.CommonStateSignalNewApplyUser;

        /**
         * Encodes the specified CommonStateSignalNewApplyUser message. Does not implicitly {@link AcFunDanmu.CommonStateSignalNewApplyUser.verify|verify} messages.
         * @param message CommonStateSignalNewApplyUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalNewApplyUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalNewApplyUser message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalNewApplyUser.verify|verify} messages.
         * @param message CommonStateSignalNewApplyUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalNewApplyUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalNewApplyUser message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalNewApplyUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalNewApplyUser;

        /**
         * Decodes a CommonStateSignalNewApplyUser message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalNewApplyUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalNewApplyUser;

        /**
         * Verifies a CommonStateSignalNewApplyUser message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalNewApplyUser message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalNewApplyUser
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalNewApplyUser;

        /**
         * Creates a plain object from a CommonStateSignalNewApplyUser message. Also converts values to other types if specified.
         * @param message CommonStateSignalNewApplyUser
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalNewApplyUser, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalNewApplyUser to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalNewApplyUser
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalPKAccept. */
    interface ICommonStateSignalPKAccept {

        /** CommonStateSignalPKAccept a */
        a?: (string|null);

        /** CommonStateSignalPKAccept b */
        b?: (string|null);
    }

    /** Represents a CommonStateSignalPKAccept. */
    class CommonStateSignalPKAccept implements ICommonStateSignalPKAccept {

        /**
         * Constructs a new CommonStateSignalPKAccept.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalPKAccept);

        /** CommonStateSignalPKAccept a. */
        public a: string;

        /** CommonStateSignalPKAccept b. */
        public b: string;

        /**
         * Creates a new CommonStateSignalPKAccept instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalPKAccept instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalPKAccept): AcFunDanmu.CommonStateSignalPKAccept;

        /**
         * Encodes the specified CommonStateSignalPKAccept message. Does not implicitly {@link AcFunDanmu.CommonStateSignalPKAccept.verify|verify} messages.
         * @param message CommonStateSignalPKAccept message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalPKAccept, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalPKAccept message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalPKAccept.verify|verify} messages.
         * @param message CommonStateSignalPKAccept message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalPKAccept, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalPKAccept message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalPKAccept
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalPKAccept;

        /**
         * Decodes a CommonStateSignalPKAccept message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalPKAccept
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalPKAccept;

        /**
         * Verifies a CommonStateSignalPKAccept message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalPKAccept message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalPKAccept
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalPKAccept;

        /**
         * Creates a plain object from a CommonStateSignalPKAccept message. Also converts values to other types if specified.
         * @param message CommonStateSignalPKAccept
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalPKAccept, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalPKAccept to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalPKAccept
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalPkEnd. */
    interface ICommonStateSignalPkEnd {

        /** CommonStateSignalPkEnd a */
        a?: (string|null);

        /** CommonStateSignalPkEnd b */
        b?: (AcFunDanmu.CommonStateSignalPkEnd.unknown|null);

        /** CommonStateSignalPkEnd c */
        c?: (string|null);
    }

    /** Represents a CommonStateSignalPkEnd. */
    class CommonStateSignalPkEnd implements ICommonStateSignalPkEnd {

        /**
         * Constructs a new CommonStateSignalPkEnd.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalPkEnd);

        /** CommonStateSignalPkEnd a. */
        public a: string;

        /** CommonStateSignalPkEnd b. */
        public b: AcFunDanmu.CommonStateSignalPkEnd.unknown;

        /** CommonStateSignalPkEnd c. */
        public c: string;

        /**
         * Creates a new CommonStateSignalPkEnd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalPkEnd instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalPkEnd): AcFunDanmu.CommonStateSignalPkEnd;

        /**
         * Encodes the specified CommonStateSignalPkEnd message. Does not implicitly {@link AcFunDanmu.CommonStateSignalPkEnd.verify|verify} messages.
         * @param message CommonStateSignalPkEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalPkEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalPkEnd message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalPkEnd.verify|verify} messages.
         * @param message CommonStateSignalPkEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalPkEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalPkEnd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalPkEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalPkEnd;

        /**
         * Decodes a CommonStateSignalPkEnd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalPkEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalPkEnd;

        /**
         * Verifies a CommonStateSignalPkEnd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalPkEnd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalPkEnd
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalPkEnd;

        /**
         * Creates a plain object from a CommonStateSignalPkEnd message. Also converts values to other types if specified.
         * @param message CommonStateSignalPkEnd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalPkEnd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalPkEnd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalPkEnd
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CommonStateSignalPkEnd {

        /** unknown enum. */
        enum unknown {
            d = 0,
            e = 1,
            f = 2,
            g = 3,
            h = 4,
            i = 5,
            j = 6,
            k = 7,
            l = 8,
            m = 9,
            n = 10,
            o = 11
        }
    }

    /** Properties of a CommonStateSignalPKInvitation. */
    interface ICommonStateSignalPKInvitation {

        /** CommonStateSignalPKInvitation a */
        a?: (string|null);

        /** CommonStateSignalPKInvitation b */
        b?: (AcFunDanmu.IPkPlayerInfo|null);

        /** CommonStateSignalPKInvitation c */
        c?: (number|Long|null);
    }

    /** Represents a CommonStateSignalPKInvitation. */
    class CommonStateSignalPKInvitation implements ICommonStateSignalPKInvitation {

        /**
         * Constructs a new CommonStateSignalPKInvitation.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalPKInvitation);

        /** CommonStateSignalPKInvitation a. */
        public a: string;

        /** CommonStateSignalPKInvitation b. */
        public b?: (AcFunDanmu.IPkPlayerInfo|null);

        /** CommonStateSignalPKInvitation c. */
        public c: (number|Long);

        /**
         * Creates a new CommonStateSignalPKInvitation instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalPKInvitation instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalPKInvitation): AcFunDanmu.CommonStateSignalPKInvitation;

        /**
         * Encodes the specified CommonStateSignalPKInvitation message. Does not implicitly {@link AcFunDanmu.CommonStateSignalPKInvitation.verify|verify} messages.
         * @param message CommonStateSignalPKInvitation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalPKInvitation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalPKInvitation message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalPKInvitation.verify|verify} messages.
         * @param message CommonStateSignalPKInvitation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalPKInvitation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalPKInvitation message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalPKInvitation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalPKInvitation;

        /**
         * Decodes a CommonStateSignalPKInvitation message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalPKInvitation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalPKInvitation;

        /**
         * Verifies a CommonStateSignalPKInvitation message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalPKInvitation message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalPKInvitation
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalPKInvitation;

        /**
         * Creates a plain object from a CommonStateSignalPKInvitation message. Also converts values to other types if specified.
         * @param message CommonStateSignalPKInvitation
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalPKInvitation, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalPKInvitation to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalPKInvitation
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PkPlayerInfo. */
    interface IPkPlayerInfo {

        /** PkPlayerInfo a */
        a?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** PkPlayerInfo b */
        b?: (string|null);

        /** PkPlayerInfo c */
        c?: (boolean|null);
    }

    /** Represents a PkPlayerInfo. */
    class PkPlayerInfo implements IPkPlayerInfo {

        /**
         * Constructs a new PkPlayerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IPkPlayerInfo);

        /** PkPlayerInfo a. */
        public a?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** PkPlayerInfo b. */
        public b: string;

        /** PkPlayerInfo c. */
        public c: boolean;

        /**
         * Creates a new PkPlayerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PkPlayerInfo instance
         */
        public static create(properties?: AcFunDanmu.IPkPlayerInfo): AcFunDanmu.PkPlayerInfo;

        /**
         * Encodes the specified PkPlayerInfo message. Does not implicitly {@link AcFunDanmu.PkPlayerInfo.verify|verify} messages.
         * @param message PkPlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IPkPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PkPlayerInfo message, length delimited. Does not implicitly {@link AcFunDanmu.PkPlayerInfo.verify|verify} messages.
         * @param message PkPlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IPkPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PkPlayerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PkPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.PkPlayerInfo;

        /**
         * Decodes a PkPlayerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PkPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.PkPlayerInfo;

        /**
         * Verifies a PkPlayerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PkPlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PkPlayerInfo
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.PkPlayerInfo;

        /**
         * Creates a plain object from a PkPlayerInfo message. Also converts values to other types if specified.
         * @param message PkPlayerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.PkPlayerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PkPlayerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PkPlayerInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalPKReady. */
    interface ICommonStateSignalPKReady {

        /** CommonStateSignalPKReady a */
        a?: (string|null);

        /** CommonStateSignalPKReady b */
        b?: (AcFunDanmu.IPkPlayerInfo[]|null);
    }

    /** Represents a CommonStateSignalPKReady. */
    class CommonStateSignalPKReady implements ICommonStateSignalPKReady {

        /**
         * Constructs a new CommonStateSignalPKReady.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalPKReady);

        /** CommonStateSignalPKReady a. */
        public a: string;

        /** CommonStateSignalPKReady b. */
        public b: AcFunDanmu.IPkPlayerInfo[];

        /**
         * Creates a new CommonStateSignalPKReady instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalPKReady instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalPKReady): AcFunDanmu.CommonStateSignalPKReady;

        /**
         * Encodes the specified CommonStateSignalPKReady message. Does not implicitly {@link AcFunDanmu.CommonStateSignalPKReady.verify|verify} messages.
         * @param message CommonStateSignalPKReady message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalPKReady, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalPKReady message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalPKReady.verify|verify} messages.
         * @param message CommonStateSignalPKReady message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalPKReady, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalPKReady message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalPKReady
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalPKReady;

        /**
         * Decodes a CommonStateSignalPKReady message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalPKReady
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalPKReady;

        /**
         * Verifies a CommonStateSignalPKReady message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalPKReady message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalPKReady
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalPKReady;

        /**
         * Creates a plain object from a CommonStateSignalPKReady message. Also converts values to other types if specified.
         * @param message CommonStateSignalPKReady
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalPKReady, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalPKReady to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalPKReady
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalPKSoundConfigChanged. */
    interface ICommonStateSignalPKSoundConfigChanged {

        /** CommonStateSignalPKSoundConfigChanged a */
        a?: (string|null);

        /** CommonStateSignalPKSoundConfigChanged b */
        b?: (AcFunDanmu.CommonStateSignalPKSoundConfigChanged.unknown|null);
    }

    /** Represents a CommonStateSignalPKSoundConfigChanged. */
    class CommonStateSignalPKSoundConfigChanged implements ICommonStateSignalPKSoundConfigChanged {

        /**
         * Constructs a new CommonStateSignalPKSoundConfigChanged.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalPKSoundConfigChanged);

        /** CommonStateSignalPKSoundConfigChanged a. */
        public a: string;

        /** CommonStateSignalPKSoundConfigChanged b. */
        public b: AcFunDanmu.CommonStateSignalPKSoundConfigChanged.unknown;

        /**
         * Creates a new CommonStateSignalPKSoundConfigChanged instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalPKSoundConfigChanged instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalPKSoundConfigChanged): AcFunDanmu.CommonStateSignalPKSoundConfigChanged;

        /**
         * Encodes the specified CommonStateSignalPKSoundConfigChanged message. Does not implicitly {@link AcFunDanmu.CommonStateSignalPKSoundConfigChanged.verify|verify} messages.
         * @param message CommonStateSignalPKSoundConfigChanged message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalPKSoundConfigChanged, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalPKSoundConfigChanged message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalPKSoundConfigChanged.verify|verify} messages.
         * @param message CommonStateSignalPKSoundConfigChanged message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalPKSoundConfigChanged, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalPKSoundConfigChanged message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalPKSoundConfigChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalPKSoundConfigChanged;

        /**
         * Decodes a CommonStateSignalPKSoundConfigChanged message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalPKSoundConfigChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalPKSoundConfigChanged;

        /**
         * Verifies a CommonStateSignalPKSoundConfigChanged message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalPKSoundConfigChanged message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalPKSoundConfigChanged
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalPKSoundConfigChanged;

        /**
         * Creates a plain object from a CommonStateSignalPKSoundConfigChanged message. Also converts values to other types if specified.
         * @param message CommonStateSignalPKSoundConfigChanged
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalPKSoundConfigChanged, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalPKSoundConfigChanged to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalPKSoundConfigChanged
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CommonStateSignalPKSoundConfigChanged {

        /** unknown enum. */
        enum unknown {
            c = 0,
            d = 1,
            e = 2
        }
    }

    /** Properties of a CommonStateSignalPkStatistic. */
    interface ICommonStateSignalPkStatistic {

        /** CommonStateSignalPkStatistic a */
        a?: (string|null);

        /** CommonStateSignalPkStatistic b */
        b?: (number|Long|null);

        /** CommonStateSignalPkStatistic c */
        c?: (number|Long|null);

        /** CommonStateSignalPkStatistic d */
        d?: (number|Long|null);

        /** CommonStateSignalPkStatistic e */
        e?: (boolean|null);

        /** CommonStateSignalPkStatistic f */
        f?: (number|Long|null);

        /** CommonStateSignalPkStatistic g */
        g?: (number|Long|null);

        /** CommonStateSignalPkStatistic h */
        h?: (number|Long|null);

        /** CommonStateSignalPkStatistic i */
        i?: (AcFunDanmu.IPkAudienceContributionInfo[]|null);

        /** CommonStateSignalPkStatistic j */
        j?: (AcFunDanmu.IPkPlayerStatistic[]|null);

        /** CommonStateSignalPkStatistic k */
        k?: (AcFunDanmu.IPkRoundInfo|null);

        /** CommonStateSignalPkStatistic l */
        l?: (number|Long|null);
    }

    /** Represents a CommonStateSignalPkStatistic. */
    class CommonStateSignalPkStatistic implements ICommonStateSignalPkStatistic {

        /**
         * Constructs a new CommonStateSignalPkStatistic.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalPkStatistic);

        /** CommonStateSignalPkStatistic a. */
        public a: string;

        /** CommonStateSignalPkStatistic b. */
        public b: (number|Long);

        /** CommonStateSignalPkStatistic c. */
        public c: (number|Long);

        /** CommonStateSignalPkStatistic d. */
        public d: (number|Long);

        /** CommonStateSignalPkStatistic e. */
        public e: boolean;

        /** CommonStateSignalPkStatistic f. */
        public f: (number|Long);

        /** CommonStateSignalPkStatistic g. */
        public g: (number|Long);

        /** CommonStateSignalPkStatistic h. */
        public h: (number|Long);

        /** CommonStateSignalPkStatistic i. */
        public i: AcFunDanmu.IPkAudienceContributionInfo[];

        /** CommonStateSignalPkStatistic j. */
        public j: AcFunDanmu.IPkPlayerStatistic[];

        /** CommonStateSignalPkStatistic k. */
        public k?: (AcFunDanmu.IPkRoundInfo|null);

        /** CommonStateSignalPkStatistic l. */
        public l: (number|Long);

        /**
         * Creates a new CommonStateSignalPkStatistic instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalPkStatistic instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalPkStatistic): AcFunDanmu.CommonStateSignalPkStatistic;

        /**
         * Encodes the specified CommonStateSignalPkStatistic message. Does not implicitly {@link AcFunDanmu.CommonStateSignalPkStatistic.verify|verify} messages.
         * @param message CommonStateSignalPkStatistic message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalPkStatistic, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalPkStatistic message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalPkStatistic.verify|verify} messages.
         * @param message CommonStateSignalPkStatistic message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalPkStatistic, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalPkStatistic message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalPkStatistic
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalPkStatistic;

        /**
         * Decodes a CommonStateSignalPkStatistic message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalPkStatistic
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalPkStatistic;

        /**
         * Verifies a CommonStateSignalPkStatistic message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalPkStatistic message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalPkStatistic
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalPkStatistic;

        /**
         * Creates a plain object from a CommonStateSignalPkStatistic message. Also converts values to other types if specified.
         * @param message CommonStateSignalPkStatistic
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalPkStatistic, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalPkStatistic to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalPkStatistic
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PkAudienceContributionInfo. */
    interface IPkAudienceContributionInfo {

        /** PkAudienceContributionInfo a */
        a?: (number|Long|null);

        /** PkAudienceContributionInfo b */
        b?: (AcFunDanmu.IPkAudienceContributionDetail[]|null);
    }

    /** Represents a PkAudienceContributionInfo. */
    class PkAudienceContributionInfo implements IPkAudienceContributionInfo {

        /**
         * Constructs a new PkAudienceContributionInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IPkAudienceContributionInfo);

        /** PkAudienceContributionInfo a. */
        public a: (number|Long);

        /** PkAudienceContributionInfo b. */
        public b: AcFunDanmu.IPkAudienceContributionDetail[];

        /**
         * Creates a new PkAudienceContributionInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PkAudienceContributionInfo instance
         */
        public static create(properties?: AcFunDanmu.IPkAudienceContributionInfo): AcFunDanmu.PkAudienceContributionInfo;

        /**
         * Encodes the specified PkAudienceContributionInfo message. Does not implicitly {@link AcFunDanmu.PkAudienceContributionInfo.verify|verify} messages.
         * @param message PkAudienceContributionInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IPkAudienceContributionInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PkAudienceContributionInfo message, length delimited. Does not implicitly {@link AcFunDanmu.PkAudienceContributionInfo.verify|verify} messages.
         * @param message PkAudienceContributionInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IPkAudienceContributionInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PkAudienceContributionInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PkAudienceContributionInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.PkAudienceContributionInfo;

        /**
         * Decodes a PkAudienceContributionInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PkAudienceContributionInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.PkAudienceContributionInfo;

        /**
         * Verifies a PkAudienceContributionInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PkAudienceContributionInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PkAudienceContributionInfo
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.PkAudienceContributionInfo;

        /**
         * Creates a plain object from a PkAudienceContributionInfo message. Also converts values to other types if specified.
         * @param message PkAudienceContributionInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.PkAudienceContributionInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PkAudienceContributionInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PkAudienceContributionInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PkAudienceContributionDetail. */
    interface IPkAudienceContributionDetail {

        /** PkAudienceContributionDetail a */
        a?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** PkAudienceContributionDetail b */
        b?: (number|Long|null);
    }

    /** Represents a PkAudienceContributionDetail. */
    class PkAudienceContributionDetail implements IPkAudienceContributionDetail {

        /**
         * Constructs a new PkAudienceContributionDetail.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IPkAudienceContributionDetail);

        /** PkAudienceContributionDetail a. */
        public a?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** PkAudienceContributionDetail b. */
        public b: (number|Long);

        /**
         * Creates a new PkAudienceContributionDetail instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PkAudienceContributionDetail instance
         */
        public static create(properties?: AcFunDanmu.IPkAudienceContributionDetail): AcFunDanmu.PkAudienceContributionDetail;

        /**
         * Encodes the specified PkAudienceContributionDetail message. Does not implicitly {@link AcFunDanmu.PkAudienceContributionDetail.verify|verify} messages.
         * @param message PkAudienceContributionDetail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IPkAudienceContributionDetail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PkAudienceContributionDetail message, length delimited. Does not implicitly {@link AcFunDanmu.PkAudienceContributionDetail.verify|verify} messages.
         * @param message PkAudienceContributionDetail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IPkAudienceContributionDetail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PkAudienceContributionDetail message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PkAudienceContributionDetail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.PkAudienceContributionDetail;

        /**
         * Decodes a PkAudienceContributionDetail message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PkAudienceContributionDetail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.PkAudienceContributionDetail;

        /**
         * Verifies a PkAudienceContributionDetail message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PkAudienceContributionDetail message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PkAudienceContributionDetail
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.PkAudienceContributionDetail;

        /**
         * Creates a plain object from a PkAudienceContributionDetail message. Also converts values to other types if specified.
         * @param message PkAudienceContributionDetail
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.PkAudienceContributionDetail, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PkAudienceContributionDetail to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PkAudienceContributionDetail
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PkPlayerStatistic. */
    interface IPkPlayerStatistic {

        /** PkPlayerStatistic a */
        a?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** PkPlayerStatistic b */
        b?: (string|null);

        /** PkPlayerStatistic c */
        c?: (number|Long|null);

        /** PkPlayerStatistic d */
        d?: (AcFunDanmu.IPkPlayerRoundStatistic[]|null);

        /** PkPlayerStatistic e */
        e?: (number|null);
    }

    /** Represents a PkPlayerStatistic. */
    class PkPlayerStatistic implements IPkPlayerStatistic {

        /**
         * Constructs a new PkPlayerStatistic.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IPkPlayerStatistic);

        /** PkPlayerStatistic a. */
        public a?: (AcFunDanmu.IZtLiveUserInfo|null);

        /** PkPlayerStatistic b. */
        public b: string;

        /** PkPlayerStatistic c. */
        public c: (number|Long);

        /** PkPlayerStatistic d. */
        public d: AcFunDanmu.IPkPlayerRoundStatistic[];

        /** PkPlayerStatistic e. */
        public e: number;

        /**
         * Creates a new PkPlayerStatistic instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PkPlayerStatistic instance
         */
        public static create(properties?: AcFunDanmu.IPkPlayerStatistic): AcFunDanmu.PkPlayerStatistic;

        /**
         * Encodes the specified PkPlayerStatistic message. Does not implicitly {@link AcFunDanmu.PkPlayerStatistic.verify|verify} messages.
         * @param message PkPlayerStatistic message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IPkPlayerStatistic, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PkPlayerStatistic message, length delimited. Does not implicitly {@link AcFunDanmu.PkPlayerStatistic.verify|verify} messages.
         * @param message PkPlayerStatistic message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IPkPlayerStatistic, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PkPlayerStatistic message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PkPlayerStatistic
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.PkPlayerStatistic;

        /**
         * Decodes a PkPlayerStatistic message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PkPlayerStatistic
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.PkPlayerStatistic;

        /**
         * Verifies a PkPlayerStatistic message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PkPlayerStatistic message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PkPlayerStatistic
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.PkPlayerStatistic;

        /**
         * Creates a plain object from a PkPlayerStatistic message. Also converts values to other types if specified.
         * @param message PkPlayerStatistic
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.PkPlayerStatistic, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PkPlayerStatistic to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PkPlayerStatistic
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PkPlayerRoundStatistic. */
    interface IPkPlayerRoundStatistic {

        /** PkPlayerRoundStatistic a */
        a?: (number|Long|null);

        /** PkPlayerRoundStatistic b */
        b?: (number|null);
    }

    /** Represents a PkPlayerRoundStatistic. */
    class PkPlayerRoundStatistic implements IPkPlayerRoundStatistic {

        /**
         * Constructs a new PkPlayerRoundStatistic.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IPkPlayerRoundStatistic);

        /** PkPlayerRoundStatistic a. */
        public a: (number|Long);

        /** PkPlayerRoundStatistic b. */
        public b: number;

        /**
         * Creates a new PkPlayerRoundStatistic instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PkPlayerRoundStatistic instance
         */
        public static create(properties?: AcFunDanmu.IPkPlayerRoundStatistic): AcFunDanmu.PkPlayerRoundStatistic;

        /**
         * Encodes the specified PkPlayerRoundStatistic message. Does not implicitly {@link AcFunDanmu.PkPlayerRoundStatistic.verify|verify} messages.
         * @param message PkPlayerRoundStatistic message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IPkPlayerRoundStatistic, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PkPlayerRoundStatistic message, length delimited. Does not implicitly {@link AcFunDanmu.PkPlayerRoundStatistic.verify|verify} messages.
         * @param message PkPlayerRoundStatistic message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IPkPlayerRoundStatistic, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PkPlayerRoundStatistic message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PkPlayerRoundStatistic
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.PkPlayerRoundStatistic;

        /**
         * Decodes a PkPlayerRoundStatistic message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PkPlayerRoundStatistic
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.PkPlayerRoundStatistic;

        /**
         * Verifies a PkPlayerRoundStatistic message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PkPlayerRoundStatistic message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PkPlayerRoundStatistic
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.PkPlayerRoundStatistic;

        /**
         * Creates a plain object from a PkPlayerRoundStatistic message. Also converts values to other types if specified.
         * @param message PkPlayerRoundStatistic
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.PkPlayerRoundStatistic, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PkPlayerRoundStatistic to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PkPlayerRoundStatistic
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PkRoundInfo. */
    interface IPkRoundInfo {

        /** PkRoundInfo a */
        a?: (number|Long|null);

        /** PkRoundInfo b */
        b?: (number|null);

        /** PkRoundInfo c */
        c?: (number|null);

        /** PkRoundInfo d */
        d?: (number|Long|null);

        /** PkRoundInfo e */
        e?: (AcFunDanmu.ZtLivePkProto|null);
    }

    /** Represents a PkRoundInfo. */
    class PkRoundInfo implements IPkRoundInfo {

        /**
         * Constructs a new PkRoundInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IPkRoundInfo);

        /** PkRoundInfo a. */
        public a: (number|Long);

        /** PkRoundInfo b. */
        public b: number;

        /** PkRoundInfo c. */
        public c: number;

        /** PkRoundInfo d. */
        public d: (number|Long);

        /** PkRoundInfo e. */
        public e: AcFunDanmu.ZtLivePkProto;

        /**
         * Creates a new PkRoundInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PkRoundInfo instance
         */
        public static create(properties?: AcFunDanmu.IPkRoundInfo): AcFunDanmu.PkRoundInfo;

        /**
         * Encodes the specified PkRoundInfo message. Does not implicitly {@link AcFunDanmu.PkRoundInfo.verify|verify} messages.
         * @param message PkRoundInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IPkRoundInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PkRoundInfo message, length delimited. Does not implicitly {@link AcFunDanmu.PkRoundInfo.verify|verify} messages.
         * @param message PkRoundInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IPkRoundInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PkRoundInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PkRoundInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.PkRoundInfo;

        /**
         * Decodes a PkRoundInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PkRoundInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.PkRoundInfo;

        /**
         * Verifies a PkRoundInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PkRoundInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PkRoundInfo
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.PkRoundInfo;

        /**
         * Creates a plain object from a PkRoundInfo message. Also converts values to other types if specified.
         * @param message PkRoundInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.PkRoundInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PkRoundInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PkRoundInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** ZtLivePkProto enum. */
    enum ZtLivePkProto {
        ZtLivePkProtoA = 0,
        ZtLivePkProtoB = 1,
        ZtLivePkProtoC = 2,
        ZtLivePkProtoD = 3
    }

    /** Properties of a CommonStateSignalRecentComment. */
    interface ICommonStateSignalRecentComment {

        /** CommonStateSignalRecentComment comment */
        comment?: (AcFunDanmu.ICommonActionSignalComment[]|null);
    }

    /** Represents a CommonStateSignalRecentComment. */
    class CommonStateSignalRecentComment implements ICommonStateSignalRecentComment {

        /**
         * Constructs a new CommonStateSignalRecentComment.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalRecentComment);

        /** CommonStateSignalRecentComment comment. */
        public comment: AcFunDanmu.ICommonActionSignalComment[];

        /**
         * Creates a new CommonStateSignalRecentComment instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalRecentComment instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalRecentComment): AcFunDanmu.CommonStateSignalRecentComment;

        /**
         * Encodes the specified CommonStateSignalRecentComment message. Does not implicitly {@link AcFunDanmu.CommonStateSignalRecentComment.verify|verify} messages.
         * @param message CommonStateSignalRecentComment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalRecentComment, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalRecentComment message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalRecentComment.verify|verify} messages.
         * @param message CommonStateSignalRecentComment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalRecentComment, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalRecentComment message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalRecentComment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalRecentComment;

        /**
         * Decodes a CommonStateSignalRecentComment message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalRecentComment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalRecentComment;

        /**
         * Verifies a CommonStateSignalRecentComment message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalRecentComment message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalRecentComment
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalRecentComment;

        /**
         * Creates a plain object from a CommonStateSignalRecentComment message. Also converts values to other types if specified.
         * @param message CommonStateSignalRecentComment
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalRecentComment, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalRecentComment to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalRecentComment
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonStateSignalShoppingCart. */
    interface ICommonStateSignalShoppingCart {

        /** CommonStateSignalShoppingCart a */
        a?: (AcFunDanmu.CommonStateSignalShoppingCart.unknown|null);

        /** CommonStateSignalShoppingCart b */
        b?: (string|null);
    }

    /** Represents a CommonStateSignalShoppingCart. */
    class CommonStateSignalShoppingCart implements ICommonStateSignalShoppingCart {

        /**
         * Constructs a new CommonStateSignalShoppingCart.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalShoppingCart);

        /** CommonStateSignalShoppingCart a. */
        public a: AcFunDanmu.CommonStateSignalShoppingCart.unknown;

        /** CommonStateSignalShoppingCart b. */
        public b: string;

        /**
         * Creates a new CommonStateSignalShoppingCart instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalShoppingCart instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalShoppingCart): AcFunDanmu.CommonStateSignalShoppingCart;

        /**
         * Encodes the specified CommonStateSignalShoppingCart message. Does not implicitly {@link AcFunDanmu.CommonStateSignalShoppingCart.verify|verify} messages.
         * @param message CommonStateSignalShoppingCart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalShoppingCart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalShoppingCart message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalShoppingCart.verify|verify} messages.
         * @param message CommonStateSignalShoppingCart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalShoppingCart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalShoppingCart message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalShoppingCart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalShoppingCart;

        /**
         * Decodes a CommonStateSignalShoppingCart message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalShoppingCart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalShoppingCart;

        /**
         * Verifies a CommonStateSignalShoppingCart message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalShoppingCart message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalShoppingCart
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalShoppingCart;

        /**
         * Creates a plain object from a CommonStateSignalShoppingCart message. Also converts values to other types if specified.
         * @param message CommonStateSignalShoppingCart
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalShoppingCart, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalShoppingCart to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalShoppingCart
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CommonStateSignalShoppingCart {

        /** unknown enum. */
        enum unknown {
            c = 0,
            d = 1,
            e = 2
        }
    }

    /** Properties of a CommonStateSignalTopUsers. */
    interface ICommonStateSignalTopUsers {

        /** CommonStateSignalTopUsers user */
        user?: (AcFunDanmu.CommonStateSignalTopUsers.ITopUser[]|null);
    }

    /** Represents a CommonStateSignalTopUsers. */
    class CommonStateSignalTopUsers implements ICommonStateSignalTopUsers {

        /**
         * Constructs a new CommonStateSignalTopUsers.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalTopUsers);

        /** CommonStateSignalTopUsers user. */
        public user: AcFunDanmu.CommonStateSignalTopUsers.ITopUser[];

        /**
         * Creates a new CommonStateSignalTopUsers instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalTopUsers instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalTopUsers): AcFunDanmu.CommonStateSignalTopUsers;

        /**
         * Encodes the specified CommonStateSignalTopUsers message. Does not implicitly {@link AcFunDanmu.CommonStateSignalTopUsers.verify|verify} messages.
         * @param message CommonStateSignalTopUsers message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalTopUsers, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalTopUsers message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalTopUsers.verify|verify} messages.
         * @param message CommonStateSignalTopUsers message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalTopUsers, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalTopUsers message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalTopUsers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalTopUsers;

        /**
         * Decodes a CommonStateSignalTopUsers message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalTopUsers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalTopUsers;

        /**
         * Verifies a CommonStateSignalTopUsers message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalTopUsers message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalTopUsers
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalTopUsers;

        /**
         * Creates a plain object from a CommonStateSignalTopUsers message. Also converts values to other types if specified.
         * @param message CommonStateSignalTopUsers
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalTopUsers, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalTopUsers to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalTopUsers
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CommonStateSignalTopUsers {

        /** Properties of a TopUser. */
        interface ITopUser {

            /** TopUser userInfo */
            userInfo?: (AcFunDanmu.IZtLiveUserInfo|null);

            /** TopUser customWatchingListData */
            customWatchingListData?: (string|null);

            /** TopUser displaySendAmount */
            displaySendAmount?: (string|null);

            /** TopUser anonymousUser */
            anonymousUser?: (boolean|null);
        }

        /** Represents a TopUser. */
        class TopUser implements ITopUser {

            /**
             * Constructs a new TopUser.
             * @param [properties] Properties to set
             */
            constructor(properties?: AcFunDanmu.CommonStateSignalTopUsers.ITopUser);

            /** TopUser userInfo. */
            public userInfo?: (AcFunDanmu.IZtLiveUserInfo|null);

            /** TopUser customWatchingListData. */
            public customWatchingListData: string;

            /** TopUser displaySendAmount. */
            public displaySendAmount: string;

            /** TopUser anonymousUser. */
            public anonymousUser: boolean;

            /**
             * Creates a new TopUser instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TopUser instance
             */
            public static create(properties?: AcFunDanmu.CommonStateSignalTopUsers.ITopUser): AcFunDanmu.CommonStateSignalTopUsers.TopUser;

            /**
             * Encodes the specified TopUser message. Does not implicitly {@link AcFunDanmu.CommonStateSignalTopUsers.TopUser.verify|verify} messages.
             * @param message TopUser message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AcFunDanmu.CommonStateSignalTopUsers.ITopUser, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TopUser message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalTopUsers.TopUser.verify|verify} messages.
             * @param message TopUser message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AcFunDanmu.CommonStateSignalTopUsers.ITopUser, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TopUser message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TopUser
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalTopUsers.TopUser;

            /**
             * Decodes a TopUser message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TopUser
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalTopUsers.TopUser;

            /**
             * Verifies a TopUser message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TopUser message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TopUser
             */
            public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalTopUsers.TopUser;

            /**
             * Creates a plain object from a TopUser message. Also converts values to other types if specified.
             * @param message TopUser
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AcFunDanmu.CommonStateSignalTopUsers.TopUser, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TopUser to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for TopUser
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a CommonStateSignalWidget. */
    interface ICommonStateSignalWidget {

        /** CommonStateSignalWidget a */
        a?: (AcFunDanmu.IWidgetItem[]|null);
    }

    /** Represents a CommonStateSignalWidget. */
    class CommonStateSignalWidget implements ICommonStateSignalWidget {

        /**
         * Constructs a new CommonStateSignalWidget.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalWidget);

        /** CommonStateSignalWidget a. */
        public a: AcFunDanmu.IWidgetItem[];

        /**
         * Creates a new CommonStateSignalWidget instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalWidget instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalWidget): AcFunDanmu.CommonStateSignalWidget;

        /**
         * Encodes the specified CommonStateSignalWidget message. Does not implicitly {@link AcFunDanmu.CommonStateSignalWidget.verify|verify} messages.
         * @param message CommonStateSignalWidget message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalWidget, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalWidget message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalWidget.verify|verify} messages.
         * @param message CommonStateSignalWidget message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalWidget, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalWidget message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalWidget
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalWidget;

        /**
         * Decodes a CommonStateSignalWidget message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalWidget
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalWidget;

        /**
         * Verifies a CommonStateSignalWidget message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalWidget message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalWidget
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalWidget;

        /**
         * Creates a plain object from a CommonStateSignalWidget message. Also converts values to other types if specified.
         * @param message CommonStateSignalWidget
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalWidget, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalWidget to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalWidget
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a WidgetItem. */
    interface IWidgetItem {

        /** WidgetItem a */
        a?: (number|Long|null);

        /** WidgetItem b */
        b?: (string|null);

        /** WidgetItem c */
        c?: (number|null);

        /** WidgetItem d */
        d?: (number|Long|null);

        /** WidgetItem e */
        e?: (number|Long|null);

        /** WidgetItem f */
        f?: (AcFunDanmu.IWidgetPictureInfo|null);

        /** WidgetItem g */
        g?: (string|null);

        /** WidgetItem h */
        h?: (AcFunDanmu.ZtLiveWidgetProtoA|null);

        /** WidgetItem i */
        i?: (AcFunDanmu.ZtLiveWidgetProtoB|null);

        /** WidgetItem j */
        j?: (AcFunDanmu.IWidgetDisplayStyle|null);

        /** WidgetItem k */
        k?: (AcFunDanmu.ZtLiveWidgetProtoC|null);

        /** WidgetItem l */
        l?: (string[]|null);

        /** WidgetItem m */
        m?: (string[]|null);

        /** WidgetItem n */
        n?: (number|Long|null);
    }

    /** Represents a WidgetItem. */
    class WidgetItem implements IWidgetItem {

        /**
         * Constructs a new WidgetItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IWidgetItem);

        /** WidgetItem a. */
        public a: (number|Long);

        /** WidgetItem b. */
        public b: string;

        /** WidgetItem c. */
        public c: number;

        /** WidgetItem d. */
        public d: (number|Long);

        /** WidgetItem e. */
        public e: (number|Long);

        /** WidgetItem f. */
        public f?: (AcFunDanmu.IWidgetPictureInfo|null);

        /** WidgetItem g. */
        public g: string;

        /** WidgetItem h. */
        public h: AcFunDanmu.ZtLiveWidgetProtoA;

        /** WidgetItem i. */
        public i: AcFunDanmu.ZtLiveWidgetProtoB;

        /** WidgetItem j. */
        public j?: (AcFunDanmu.IWidgetDisplayStyle|null);

        /** WidgetItem k. */
        public k: AcFunDanmu.ZtLiveWidgetProtoC;

        /** WidgetItem l. */
        public l: string[];

        /** WidgetItem m. */
        public m: string[];

        /** WidgetItem n. */
        public n: (number|Long);

        /**
         * Creates a new WidgetItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WidgetItem instance
         */
        public static create(properties?: AcFunDanmu.IWidgetItem): AcFunDanmu.WidgetItem;

        /**
         * Encodes the specified WidgetItem message. Does not implicitly {@link AcFunDanmu.WidgetItem.verify|verify} messages.
         * @param message WidgetItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IWidgetItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WidgetItem message, length delimited. Does not implicitly {@link AcFunDanmu.WidgetItem.verify|verify} messages.
         * @param message WidgetItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IWidgetItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WidgetItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WidgetItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.WidgetItem;

        /**
         * Decodes a WidgetItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WidgetItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.WidgetItem;

        /**
         * Verifies a WidgetItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WidgetItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WidgetItem
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.WidgetItem;

        /**
         * Creates a plain object from a WidgetItem message. Also converts values to other types if specified.
         * @param message WidgetItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.WidgetItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WidgetItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for WidgetItem
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a WidgetDisplayStyle. */
    interface IWidgetDisplayStyle {

        /** WidgetDisplayStyle a */
        a?: (boolean|null);

        /** WidgetDisplayStyle b */
        b?: (boolean|null);
    }

    /** Represents a WidgetDisplayStyle. */
    class WidgetDisplayStyle implements IWidgetDisplayStyle {

        /**
         * Constructs a new WidgetDisplayStyle.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IWidgetDisplayStyle);

        /** WidgetDisplayStyle a. */
        public a: boolean;

        /** WidgetDisplayStyle b. */
        public b: boolean;

        /**
         * Creates a new WidgetDisplayStyle instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WidgetDisplayStyle instance
         */
        public static create(properties?: AcFunDanmu.IWidgetDisplayStyle): AcFunDanmu.WidgetDisplayStyle;

        /**
         * Encodes the specified WidgetDisplayStyle message. Does not implicitly {@link AcFunDanmu.WidgetDisplayStyle.verify|verify} messages.
         * @param message WidgetDisplayStyle message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IWidgetDisplayStyle, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WidgetDisplayStyle message, length delimited. Does not implicitly {@link AcFunDanmu.WidgetDisplayStyle.verify|verify} messages.
         * @param message WidgetDisplayStyle message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IWidgetDisplayStyle, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WidgetDisplayStyle message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WidgetDisplayStyle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.WidgetDisplayStyle;

        /**
         * Decodes a WidgetDisplayStyle message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WidgetDisplayStyle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.WidgetDisplayStyle;

        /**
         * Verifies a WidgetDisplayStyle message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WidgetDisplayStyle message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WidgetDisplayStyle
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.WidgetDisplayStyle;

        /**
         * Creates a plain object from a WidgetDisplayStyle message. Also converts values to other types if specified.
         * @param message WidgetDisplayStyle
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.WidgetDisplayStyle, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WidgetDisplayStyle to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for WidgetDisplayStyle
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a WidgetPictureInfo. */
    interface IWidgetPictureInfo {

        /** WidgetPictureInfo a */
        a?: (AcFunDanmu.IImageCdnNode|null);

        /** WidgetPictureInfo b */
        b?: (number|null);

        /** WidgetPictureInfo c */
        c?: (number|null);
    }

    /** Represents a WidgetPictureInfo. */
    class WidgetPictureInfo implements IWidgetPictureInfo {

        /**
         * Constructs a new WidgetPictureInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IWidgetPictureInfo);

        /** WidgetPictureInfo a. */
        public a?: (AcFunDanmu.IImageCdnNode|null);

        /** WidgetPictureInfo b. */
        public b: number;

        /** WidgetPictureInfo c. */
        public c: number;

        /**
         * Creates a new WidgetPictureInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WidgetPictureInfo instance
         */
        public static create(properties?: AcFunDanmu.IWidgetPictureInfo): AcFunDanmu.WidgetPictureInfo;

        /**
         * Encodes the specified WidgetPictureInfo message. Does not implicitly {@link AcFunDanmu.WidgetPictureInfo.verify|verify} messages.
         * @param message WidgetPictureInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IWidgetPictureInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WidgetPictureInfo message, length delimited. Does not implicitly {@link AcFunDanmu.WidgetPictureInfo.verify|verify} messages.
         * @param message WidgetPictureInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IWidgetPictureInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WidgetPictureInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WidgetPictureInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.WidgetPictureInfo;

        /**
         * Decodes a WidgetPictureInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WidgetPictureInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.WidgetPictureInfo;

        /**
         * Verifies a WidgetPictureInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WidgetPictureInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WidgetPictureInfo
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.WidgetPictureInfo;

        /**
         * Creates a plain object from a WidgetPictureInfo message. Also converts values to other types if specified.
         * @param message WidgetPictureInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.WidgetPictureInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WidgetPictureInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for WidgetPictureInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** ZtLiveWidgetProtoA enum. */
    enum ZtLiveWidgetProtoA {
        ZtLiveWidgetProtoAa = 0,
        ZtLiveWidgetProtoAb = 1,
        ZtLiveWidgetProtoAc = 2,
        ZtLiveWidgetProtoAd = 3,
        ZtLiveWidgetProtoAe = 4
    }

    /** ZtLiveWidgetProtoB enum. */
    enum ZtLiveWidgetProtoB {
        ZtLiveWidgetProtoBa = 0,
        ZtLiveWidgetProtoBb = 1,
        ZtLiveWidgetProtoBc = 2,
        ZtLiveWidgetProtoBd = 3,
        ZtLiveWidgetProtoBe = 4,
        ZtLiveWidgetProtoBf = 5
    }

    /** ZtLiveWidgetProtoC enum. */
    enum ZtLiveWidgetProtoC {
        ZtLiveWidgetProtoCa = 0,
        ZtLiveWidgetProtoCb = 1,
        ZtLiveWidgetProtoCc = 2,
        ZtLiveWidgetProtoCd = 3
    }

    /** Properties of a CommonStateSignalWishSheetCurrentState. */
    interface ICommonStateSignalWishSheetCurrentState {

        /** CommonStateSignalWishSheetCurrentState a */
        a?: (string|null);

        /** CommonStateSignalWishSheetCurrentState b */
        b?: (AcFunDanmu.CommonStateSignalWishSheetCurrentState.IWishCurrentState[]|null);
    }

    /** Represents a CommonStateSignalWishSheetCurrentState. */
    class CommonStateSignalWishSheetCurrentState implements ICommonStateSignalWishSheetCurrentState {

        /**
         * Constructs a new CommonStateSignalWishSheetCurrentState.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ICommonStateSignalWishSheetCurrentState);

        /** CommonStateSignalWishSheetCurrentState a. */
        public a: string;

        /** CommonStateSignalWishSheetCurrentState b. */
        public b: AcFunDanmu.CommonStateSignalWishSheetCurrentState.IWishCurrentState[];

        /**
         * Creates a new CommonStateSignalWishSheetCurrentState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonStateSignalWishSheetCurrentState instance
         */
        public static create(properties?: AcFunDanmu.ICommonStateSignalWishSheetCurrentState): AcFunDanmu.CommonStateSignalWishSheetCurrentState;

        /**
         * Encodes the specified CommonStateSignalWishSheetCurrentState message. Does not implicitly {@link AcFunDanmu.CommonStateSignalWishSheetCurrentState.verify|verify} messages.
         * @param message CommonStateSignalWishSheetCurrentState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ICommonStateSignalWishSheetCurrentState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonStateSignalWishSheetCurrentState message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalWishSheetCurrentState.verify|verify} messages.
         * @param message CommonStateSignalWishSheetCurrentState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ICommonStateSignalWishSheetCurrentState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonStateSignalWishSheetCurrentState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonStateSignalWishSheetCurrentState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalWishSheetCurrentState;

        /**
         * Decodes a CommonStateSignalWishSheetCurrentState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonStateSignalWishSheetCurrentState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalWishSheetCurrentState;

        /**
         * Verifies a CommonStateSignalWishSheetCurrentState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonStateSignalWishSheetCurrentState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonStateSignalWishSheetCurrentState
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalWishSheetCurrentState;

        /**
         * Creates a plain object from a CommonStateSignalWishSheetCurrentState message. Also converts values to other types if specified.
         * @param message CommonStateSignalWishSheetCurrentState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.CommonStateSignalWishSheetCurrentState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonStateSignalWishSheetCurrentState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonStateSignalWishSheetCurrentState
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CommonStateSignalWishSheetCurrentState {

        /** Properties of a WishCurrentState. */
        interface IWishCurrentState {

            /** WishCurrentState a */
            a?: (string|null);

            /** WishCurrentState b */
            b?: (number|Long|null);

            /** WishCurrentState c */
            c?: (number|Long|null);

            /** WishCurrentState d */
            d?: (number|Long|null);

            /** WishCurrentState e */
            e?: (string|null);

            /** WishCurrentState f */
            f?: (string|null);
        }

        /** Represents a WishCurrentState. */
        class WishCurrentState implements IWishCurrentState {

            /**
             * Constructs a new WishCurrentState.
             * @param [properties] Properties to set
             */
            constructor(properties?: AcFunDanmu.CommonStateSignalWishSheetCurrentState.IWishCurrentState);

            /** WishCurrentState a. */
            public a: string;

            /** WishCurrentState b. */
            public b: (number|Long);

            /** WishCurrentState c. */
            public c: (number|Long);

            /** WishCurrentState d. */
            public d: (number|Long);

            /** WishCurrentState e. */
            public e: string;

            /** WishCurrentState f. */
            public f: string;

            /**
             * Creates a new WishCurrentState instance using the specified properties.
             * @param [properties] Properties to set
             * @returns WishCurrentState instance
             */
            public static create(properties?: AcFunDanmu.CommonStateSignalWishSheetCurrentState.IWishCurrentState): AcFunDanmu.CommonStateSignalWishSheetCurrentState.WishCurrentState;

            /**
             * Encodes the specified WishCurrentState message. Does not implicitly {@link AcFunDanmu.CommonStateSignalWishSheetCurrentState.WishCurrentState.verify|verify} messages.
             * @param message WishCurrentState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AcFunDanmu.CommonStateSignalWishSheetCurrentState.IWishCurrentState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified WishCurrentState message, length delimited. Does not implicitly {@link AcFunDanmu.CommonStateSignalWishSheetCurrentState.WishCurrentState.verify|verify} messages.
             * @param message WishCurrentState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AcFunDanmu.CommonStateSignalWishSheetCurrentState.IWishCurrentState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a WishCurrentState message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns WishCurrentState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.CommonStateSignalWishSheetCurrentState.WishCurrentState;

            /**
             * Decodes a WishCurrentState message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns WishCurrentState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.CommonStateSignalWishSheetCurrentState.WishCurrentState;

            /**
             * Verifies a WishCurrentState message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a WishCurrentState message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns WishCurrentState
             */
            public static fromObject(object: { [k: string]: any }): AcFunDanmu.CommonStateSignalWishSheetCurrentState.WishCurrentState;

            /**
             * Creates a plain object from a WishCurrentState message. Also converts values to other types if specified.
             * @param message WishCurrentState
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AcFunDanmu.CommonStateSignalWishSheetCurrentState.WishCurrentState, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this WishCurrentState to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for WishCurrentState
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** CsAckErrorCode enum. */
    enum CsAckErrorCode {
        SUCCESS_CS_ACK = 0,
        LIVE_CLOSED = 1,
        TICKET_ILLEGAL = 2,
        ATTACH_ILLEGAL = 3,
        USER_NOT_IN_ROOM = 4,
        SERVER_ERROR = 5,
        REQUEST_PARAM_INVALID = 6,
        ROOM_NOT_EXIST_IN_STATE_MANAGER = 7,
        NEW_LIVE_OPENED = 8
    }

    /** Properties of a KwaiStateSignalEcommerceCart. */
    interface IKwaiStateSignalEcommerceCart {

        /** KwaiStateSignalEcommerceCart a */
        a?: (AcFunDanmu.KwaiStateSignalEcommerceCart.unknown|null);
    }

    /** Represents a KwaiStateSignalEcommerceCart. */
    class KwaiStateSignalEcommerceCart implements IKwaiStateSignalEcommerceCart {

        /**
         * Constructs a new KwaiStateSignalEcommerceCart.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IKwaiStateSignalEcommerceCart);

        /** KwaiStateSignalEcommerceCart a. */
        public a: AcFunDanmu.KwaiStateSignalEcommerceCart.unknown;

        /**
         * Creates a new KwaiStateSignalEcommerceCart instance using the specified properties.
         * @param [properties] Properties to set
         * @returns KwaiStateSignalEcommerceCart instance
         */
        public static create(properties?: AcFunDanmu.IKwaiStateSignalEcommerceCart): AcFunDanmu.KwaiStateSignalEcommerceCart;

        /**
         * Encodes the specified KwaiStateSignalEcommerceCart message. Does not implicitly {@link AcFunDanmu.KwaiStateSignalEcommerceCart.verify|verify} messages.
         * @param message KwaiStateSignalEcommerceCart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IKwaiStateSignalEcommerceCart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified KwaiStateSignalEcommerceCart message, length delimited. Does not implicitly {@link AcFunDanmu.KwaiStateSignalEcommerceCart.verify|verify} messages.
         * @param message KwaiStateSignalEcommerceCart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IKwaiStateSignalEcommerceCart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a KwaiStateSignalEcommerceCart message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns KwaiStateSignalEcommerceCart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.KwaiStateSignalEcommerceCart;

        /**
         * Decodes a KwaiStateSignalEcommerceCart message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns KwaiStateSignalEcommerceCart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.KwaiStateSignalEcommerceCart;

        /**
         * Verifies a KwaiStateSignalEcommerceCart message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a KwaiStateSignalEcommerceCart message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns KwaiStateSignalEcommerceCart
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.KwaiStateSignalEcommerceCart;

        /**
         * Creates a plain object from a KwaiStateSignalEcommerceCart message. Also converts values to other types if specified.
         * @param message KwaiStateSignalEcommerceCart
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.KwaiStateSignalEcommerceCart, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this KwaiStateSignalEcommerceCart to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for KwaiStateSignalEcommerceCart
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace KwaiStateSignalEcommerceCart {

        /** unknown enum. */
        enum unknown {
            b = 0,
            c = 1
        }
    }

    /** Properties of a KwaiStateSignalEcommerceCartItemPopup. */
    interface IKwaiStateSignalEcommerceCartItemPopup {

        /** KwaiStateSignalEcommerceCartItemPopup a */
        a?: (AcFunDanmu.KwaiStateSignalEcommerceCartItemPopup.unknown|null);

        /** KwaiStateSignalEcommerceCartItemPopup b */
        b?: (string|null);

        /** KwaiStateSignalEcommerceCartItemPopup c */
        c?: (string|null);

        /** KwaiStateSignalEcommerceCartItemPopup d */
        d?: (string|null);

        /** KwaiStateSignalEcommerceCartItemPopup e */
        e?: (string|null);
    }

    /** Represents a KwaiStateSignalEcommerceCartItemPopup. */
    class KwaiStateSignalEcommerceCartItemPopup implements IKwaiStateSignalEcommerceCartItemPopup {

        /**
         * Constructs a new KwaiStateSignalEcommerceCartItemPopup.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IKwaiStateSignalEcommerceCartItemPopup);

        /** KwaiStateSignalEcommerceCartItemPopup a. */
        public a: AcFunDanmu.KwaiStateSignalEcommerceCartItemPopup.unknown;

        /** KwaiStateSignalEcommerceCartItemPopup b. */
        public b: string;

        /** KwaiStateSignalEcommerceCartItemPopup c. */
        public c: string;

        /** KwaiStateSignalEcommerceCartItemPopup d. */
        public d: string;

        /** KwaiStateSignalEcommerceCartItemPopup e. */
        public e: string;

        /**
         * Creates a new KwaiStateSignalEcommerceCartItemPopup instance using the specified properties.
         * @param [properties] Properties to set
         * @returns KwaiStateSignalEcommerceCartItemPopup instance
         */
        public static create(properties?: AcFunDanmu.IKwaiStateSignalEcommerceCartItemPopup): AcFunDanmu.KwaiStateSignalEcommerceCartItemPopup;

        /**
         * Encodes the specified KwaiStateSignalEcommerceCartItemPopup message. Does not implicitly {@link AcFunDanmu.KwaiStateSignalEcommerceCartItemPopup.verify|verify} messages.
         * @param message KwaiStateSignalEcommerceCartItemPopup message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IKwaiStateSignalEcommerceCartItemPopup, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified KwaiStateSignalEcommerceCartItemPopup message, length delimited. Does not implicitly {@link AcFunDanmu.KwaiStateSignalEcommerceCartItemPopup.verify|verify} messages.
         * @param message KwaiStateSignalEcommerceCartItemPopup message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IKwaiStateSignalEcommerceCartItemPopup, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a KwaiStateSignalEcommerceCartItemPopup message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns KwaiStateSignalEcommerceCartItemPopup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.KwaiStateSignalEcommerceCartItemPopup;

        /**
         * Decodes a KwaiStateSignalEcommerceCartItemPopup message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns KwaiStateSignalEcommerceCartItemPopup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.KwaiStateSignalEcommerceCartItemPopup;

        /**
         * Verifies a KwaiStateSignalEcommerceCartItemPopup message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a KwaiStateSignalEcommerceCartItemPopup message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns KwaiStateSignalEcommerceCartItemPopup
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.KwaiStateSignalEcommerceCartItemPopup;

        /**
         * Creates a plain object from a KwaiStateSignalEcommerceCartItemPopup message. Also converts values to other types if specified.
         * @param message KwaiStateSignalEcommerceCartItemPopup
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.KwaiStateSignalEcommerceCartItemPopup, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this KwaiStateSignalEcommerceCartItemPopup to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for KwaiStateSignalEcommerceCartItemPopup
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace KwaiStateSignalEcommerceCartItemPopup {

        /** unknown enum. */
        enum unknown {
            f = 0,
            g = 1
        }
    }

    /** Properties of a TopBannerNotice. */
    interface ITopBannerNotice {

        /** TopBannerNotice a */
        a?: (string|null);

        /** TopBannerNotice b */
        b?: (string|null);

        /** TopBannerNotice c */
        c?: (string|null);

        /** TopBannerNotice d */
        d?: (AcFunDanmu.IBackgroundStyle|null);

        /** TopBannerNotice e */
        e?: (number|null);

        /** TopBannerNotice f */
        f?: (AcFunDanmu.IButton|null);

        /** TopBannerNotice g */
        g?: (AcFunDanmu.IImageCdnNode[]|null);

        /** TopBannerNotice h */
        h?: (number|Long|null);
    }

    /** Represents a TopBannerNotice. */
    class TopBannerNotice implements ITopBannerNotice {

        /**
         * Constructs a new TopBannerNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.ITopBannerNotice);

        /** TopBannerNotice a. */
        public a: string;

        /** TopBannerNotice b. */
        public b: string;

        /** TopBannerNotice c. */
        public c: string;

        /** TopBannerNotice d. */
        public d?: (AcFunDanmu.IBackgroundStyle|null);

        /** TopBannerNotice e. */
        public e: number;

        /** TopBannerNotice f. */
        public f?: (AcFunDanmu.IButton|null);

        /** TopBannerNotice g. */
        public g: AcFunDanmu.IImageCdnNode[];

        /** TopBannerNotice h. */
        public h: (number|Long);

        /**
         * Creates a new TopBannerNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TopBannerNotice instance
         */
        public static create(properties?: AcFunDanmu.ITopBannerNotice): AcFunDanmu.TopBannerNotice;

        /**
         * Encodes the specified TopBannerNotice message. Does not implicitly {@link AcFunDanmu.TopBannerNotice.verify|verify} messages.
         * @param message TopBannerNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.ITopBannerNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TopBannerNotice message, length delimited. Does not implicitly {@link AcFunDanmu.TopBannerNotice.verify|verify} messages.
         * @param message TopBannerNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.ITopBannerNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TopBannerNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TopBannerNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.TopBannerNotice;

        /**
         * Decodes a TopBannerNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TopBannerNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.TopBannerNotice;

        /**
         * Verifies a TopBannerNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TopBannerNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TopBannerNotice
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.TopBannerNotice;

        /**
         * Creates a plain object from a TopBannerNotice message. Also converts values to other types if specified.
         * @param message TopBannerNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.TopBannerNotice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TopBannerNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TopBannerNotice
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveActionSignalItem. */
    interface IZtLiveActionSignalItem {

        /** ZtLiveActionSignalItem signalType */
        signalType?: (string|null);

        /** ZtLiveActionSignalItem payload */
        payload?: (Uint8Array[]|null);
    }

    /** Represents a ZtLiveActionSignalItem. */
    class ZtLiveActionSignalItem implements IZtLiveActionSignalItem {

        /**
         * Constructs a new ZtLiveActionSignalItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveActionSignalItem);

        /** ZtLiveActionSignalItem signalType. */
        public signalType: string;

        /** ZtLiveActionSignalItem payload. */
        public payload: Uint8Array[];

        /**
         * Creates a new ZtLiveActionSignalItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveActionSignalItem instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveActionSignalItem): AcFunDanmu.ZtLiveActionSignalItem;

        /**
         * Encodes the specified ZtLiveActionSignalItem message. Does not implicitly {@link AcFunDanmu.ZtLiveActionSignalItem.verify|verify} messages.
         * @param message ZtLiveActionSignalItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveActionSignalItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveActionSignalItem message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveActionSignalItem.verify|verify} messages.
         * @param message ZtLiveActionSignalItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveActionSignalItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveActionSignalItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveActionSignalItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveActionSignalItem;

        /**
         * Decodes a ZtLiveActionSignalItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveActionSignalItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveActionSignalItem;

        /**
         * Verifies a ZtLiveActionSignalItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveActionSignalItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveActionSignalItem
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveActionSignalItem;

        /**
         * Creates a plain object from a ZtLiveActionSignalItem message. Also converts values to other types if specified.
         * @param message ZtLiveActionSignalItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveActionSignalItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveActionSignalItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveActionSignalItem
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveCsCmd. */
    interface IZtLiveCsCmd {

        /** ZtLiveCsCmd cmdType */
        cmdType?: (string|null);

        /** ZtLiveCsCmd payload */
        payload?: (Uint8Array|null);

        /** ZtLiveCsCmd ticket */
        ticket?: (string|null);

        /** ZtLiveCsCmd liveId */
        liveId?: (string|null);
    }

    /** Represents a ZtLiveCsCmd. */
    class ZtLiveCsCmd implements IZtLiveCsCmd {

        /**
         * Constructs a new ZtLiveCsCmd.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveCsCmd);

        /** ZtLiveCsCmd cmdType. */
        public cmdType: string;

        /** ZtLiveCsCmd payload. */
        public payload: Uint8Array;

        /** ZtLiveCsCmd ticket. */
        public ticket: string;

        /** ZtLiveCsCmd liveId. */
        public liveId: string;

        /**
         * Creates a new ZtLiveCsCmd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveCsCmd instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveCsCmd): AcFunDanmu.ZtLiveCsCmd;

        /**
         * Encodes the specified ZtLiveCsCmd message. Does not implicitly {@link AcFunDanmu.ZtLiveCsCmd.verify|verify} messages.
         * @param message ZtLiveCsCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveCsCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveCsCmd message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveCsCmd.verify|verify} messages.
         * @param message ZtLiveCsCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveCsCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveCsCmd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveCsCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveCsCmd;

        /**
         * Decodes a ZtLiveCsCmd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveCsCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveCsCmd;

        /**
         * Verifies a ZtLiveCsCmd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveCsCmd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveCsCmd
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveCsCmd;

        /**
         * Creates a plain object from a ZtLiveCsCmd message. Also converts values to other types if specified.
         * @param message ZtLiveCsCmd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveCsCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveCsCmd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveCsCmd
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveCsCmdAck. */
    interface IZtLiveCsCmdAck {

        /** ZtLiveCsCmdAck cmdAckType */
        cmdAckType?: (string|null);

        /** ZtLiveCsCmdAck errorCode */
        errorCode?: (number|Long|null);

        /** ZtLiveCsCmdAck errorMsg */
        errorMsg?: (string|null);

        /** ZtLiveCsCmdAck payload */
        payload?: (Uint8Array|null);
    }

    /** Represents a ZtLiveCsCmdAck. */
    class ZtLiveCsCmdAck implements IZtLiveCsCmdAck {

        /**
         * Constructs a new ZtLiveCsCmdAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveCsCmdAck);

        /** ZtLiveCsCmdAck cmdAckType. */
        public cmdAckType: string;

        /** ZtLiveCsCmdAck errorCode. */
        public errorCode: (number|Long);

        /** ZtLiveCsCmdAck errorMsg. */
        public errorMsg: string;

        /** ZtLiveCsCmdAck payload. */
        public payload: Uint8Array;

        /**
         * Creates a new ZtLiveCsCmdAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveCsCmdAck instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveCsCmdAck): AcFunDanmu.ZtLiveCsCmdAck;

        /**
         * Encodes the specified ZtLiveCsCmdAck message. Does not implicitly {@link AcFunDanmu.ZtLiveCsCmdAck.verify|verify} messages.
         * @param message ZtLiveCsCmdAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveCsCmdAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveCsCmdAck message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveCsCmdAck.verify|verify} messages.
         * @param message ZtLiveCsCmdAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveCsCmdAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveCsCmdAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveCsCmdAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveCsCmdAck;

        /**
         * Decodes a ZtLiveCsCmdAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveCsCmdAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveCsCmdAck;

        /**
         * Verifies a ZtLiveCsCmdAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveCsCmdAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveCsCmdAck
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveCsCmdAck;

        /**
         * Creates a plain object from a ZtLiveCsCmdAck message. Also converts values to other types if specified.
         * @param message ZtLiveCsCmdAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveCsCmdAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveCsCmdAck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveCsCmdAck
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveCsEnterRoom. */
    interface IZtLiveCsEnterRoom {

        /** ZtLiveCsEnterRoom isAuthor */
        isAuthor?: (boolean|null);

        /** ZtLiveCsEnterRoom reconnectCount */
        reconnectCount?: (number|null);

        /** ZtLiveCsEnterRoom lastErrorCode */
        lastErrorCode?: (number|null);

        /** ZtLiveCsEnterRoom enterRoomAttach */
        enterRoomAttach?: (string|null);

        /** ZtLiveCsEnterRoom clientLiveSdkVersion */
        clientLiveSdkVersion?: (string|null);
    }

    /** Represents a ZtLiveCsEnterRoom. */
    class ZtLiveCsEnterRoom implements IZtLiveCsEnterRoom {

        /**
         * Constructs a new ZtLiveCsEnterRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveCsEnterRoom);

        /** ZtLiveCsEnterRoom isAuthor. */
        public isAuthor: boolean;

        /** ZtLiveCsEnterRoom reconnectCount. */
        public reconnectCount: number;

        /** ZtLiveCsEnterRoom lastErrorCode. */
        public lastErrorCode: number;

        /** ZtLiveCsEnterRoom enterRoomAttach. */
        public enterRoomAttach: string;

        /** ZtLiveCsEnterRoom clientLiveSdkVersion. */
        public clientLiveSdkVersion: string;

        /**
         * Creates a new ZtLiveCsEnterRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveCsEnterRoom instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveCsEnterRoom): AcFunDanmu.ZtLiveCsEnterRoom;

        /**
         * Encodes the specified ZtLiveCsEnterRoom message. Does not implicitly {@link AcFunDanmu.ZtLiveCsEnterRoom.verify|verify} messages.
         * @param message ZtLiveCsEnterRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveCsEnterRoom, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveCsEnterRoom message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveCsEnterRoom.verify|verify} messages.
         * @param message ZtLiveCsEnterRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveCsEnterRoom, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveCsEnterRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveCsEnterRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveCsEnterRoom;

        /**
         * Decodes a ZtLiveCsEnterRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveCsEnterRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveCsEnterRoom;

        /**
         * Verifies a ZtLiveCsEnterRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveCsEnterRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveCsEnterRoom
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveCsEnterRoom;

        /**
         * Creates a plain object from a ZtLiveCsEnterRoom message. Also converts values to other types if specified.
         * @param message ZtLiveCsEnterRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveCsEnterRoom, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveCsEnterRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveCsEnterRoom
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveCsEnterRoomAck. */
    interface IZtLiveCsEnterRoomAck {

        /** ZtLiveCsEnterRoomAck heartbeatIntervalMs */
        heartbeatIntervalMs?: (number|Long|null);
    }

    /** Represents a ZtLiveCsEnterRoomAck. */
    class ZtLiveCsEnterRoomAck implements IZtLiveCsEnterRoomAck {

        /**
         * Constructs a new ZtLiveCsEnterRoomAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveCsEnterRoomAck);

        /** ZtLiveCsEnterRoomAck heartbeatIntervalMs. */
        public heartbeatIntervalMs: (number|Long);

        /**
         * Creates a new ZtLiveCsEnterRoomAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveCsEnterRoomAck instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveCsEnterRoomAck): AcFunDanmu.ZtLiveCsEnterRoomAck;

        /**
         * Encodes the specified ZtLiveCsEnterRoomAck message. Does not implicitly {@link AcFunDanmu.ZtLiveCsEnterRoomAck.verify|verify} messages.
         * @param message ZtLiveCsEnterRoomAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveCsEnterRoomAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveCsEnterRoomAck message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveCsEnterRoomAck.verify|verify} messages.
         * @param message ZtLiveCsEnterRoomAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveCsEnterRoomAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveCsEnterRoomAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveCsEnterRoomAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveCsEnterRoomAck;

        /**
         * Decodes a ZtLiveCsEnterRoomAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveCsEnterRoomAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveCsEnterRoomAck;

        /**
         * Verifies a ZtLiveCsEnterRoomAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveCsEnterRoomAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveCsEnterRoomAck
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveCsEnterRoomAck;

        /**
         * Creates a plain object from a ZtLiveCsEnterRoomAck message. Also converts values to other types if specified.
         * @param message ZtLiveCsEnterRoomAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveCsEnterRoomAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveCsEnterRoomAck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveCsEnterRoomAck
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveCsHeartbeat. */
    interface IZtLiveCsHeartbeat {

        /** ZtLiveCsHeartbeat clientTimestampMs */
        clientTimestampMs?: (number|Long|null);

        /** ZtLiveCsHeartbeat sequence */
        sequence?: (number|Long|null);
    }

    /** Represents a ZtLiveCsHeartbeat. */
    class ZtLiveCsHeartbeat implements IZtLiveCsHeartbeat {

        /**
         * Constructs a new ZtLiveCsHeartbeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveCsHeartbeat);

        /** ZtLiveCsHeartbeat clientTimestampMs. */
        public clientTimestampMs: (number|Long);

        /** ZtLiveCsHeartbeat sequence. */
        public sequence: (number|Long);

        /**
         * Creates a new ZtLiveCsHeartbeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveCsHeartbeat instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveCsHeartbeat): AcFunDanmu.ZtLiveCsHeartbeat;

        /**
         * Encodes the specified ZtLiveCsHeartbeat message. Does not implicitly {@link AcFunDanmu.ZtLiveCsHeartbeat.verify|verify} messages.
         * @param message ZtLiveCsHeartbeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveCsHeartbeat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveCsHeartbeat message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveCsHeartbeat.verify|verify} messages.
         * @param message ZtLiveCsHeartbeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveCsHeartbeat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveCsHeartbeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveCsHeartbeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveCsHeartbeat;

        /**
         * Decodes a ZtLiveCsHeartbeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveCsHeartbeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveCsHeartbeat;

        /**
         * Verifies a ZtLiveCsHeartbeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveCsHeartbeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveCsHeartbeat
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveCsHeartbeat;

        /**
         * Creates a plain object from a ZtLiveCsHeartbeat message. Also converts values to other types if specified.
         * @param message ZtLiveCsHeartbeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveCsHeartbeat, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveCsHeartbeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveCsHeartbeat
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveCsHeartbeatAck. */
    interface IZtLiveCsHeartbeatAck {

        /** ZtLiveCsHeartbeatAck serverTimestampMs */
        serverTimestampMs?: (number|Long|null);

        /** ZtLiveCsHeartbeatAck clientTimestampMs */
        clientTimestampMs?: (number|Long|null);

        /** ZtLiveCsHeartbeatAck clientSequence */
        clientSequence?: (number|Long|null);
    }

    /** Represents a ZtLiveCsHeartbeatAck. */
    class ZtLiveCsHeartbeatAck implements IZtLiveCsHeartbeatAck {

        /**
         * Constructs a new ZtLiveCsHeartbeatAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveCsHeartbeatAck);

        /** ZtLiveCsHeartbeatAck serverTimestampMs. */
        public serverTimestampMs: (number|Long);

        /** ZtLiveCsHeartbeatAck clientTimestampMs. */
        public clientTimestampMs: (number|Long);

        /** ZtLiveCsHeartbeatAck clientSequence. */
        public clientSequence: (number|Long);

        /**
         * Creates a new ZtLiveCsHeartbeatAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveCsHeartbeatAck instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveCsHeartbeatAck): AcFunDanmu.ZtLiveCsHeartbeatAck;

        /**
         * Encodes the specified ZtLiveCsHeartbeatAck message. Does not implicitly {@link AcFunDanmu.ZtLiveCsHeartbeatAck.verify|verify} messages.
         * @param message ZtLiveCsHeartbeatAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveCsHeartbeatAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveCsHeartbeatAck message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveCsHeartbeatAck.verify|verify} messages.
         * @param message ZtLiveCsHeartbeatAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveCsHeartbeatAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveCsHeartbeatAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveCsHeartbeatAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveCsHeartbeatAck;

        /**
         * Decodes a ZtLiveCsHeartbeatAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveCsHeartbeatAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveCsHeartbeatAck;

        /**
         * Verifies a ZtLiveCsHeartbeatAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveCsHeartbeatAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveCsHeartbeatAck
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveCsHeartbeatAck;

        /**
         * Creates a plain object from a ZtLiveCsHeartbeatAck message. Also converts values to other types if specified.
         * @param message ZtLiveCsHeartbeatAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveCsHeartbeatAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveCsHeartbeatAck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveCsHeartbeatAck
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveCsUserExit. */
    interface IZtLiveCsUserExit {
    }

    /** Represents a ZtLiveCsUserExit. */
    class ZtLiveCsUserExit implements IZtLiveCsUserExit {

        /**
         * Constructs a new ZtLiveCsUserExit.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveCsUserExit);

        /**
         * Creates a new ZtLiveCsUserExit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveCsUserExit instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveCsUserExit): AcFunDanmu.ZtLiveCsUserExit;

        /**
         * Encodes the specified ZtLiveCsUserExit message. Does not implicitly {@link AcFunDanmu.ZtLiveCsUserExit.verify|verify} messages.
         * @param message ZtLiveCsUserExit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveCsUserExit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveCsUserExit message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveCsUserExit.verify|verify} messages.
         * @param message ZtLiveCsUserExit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveCsUserExit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveCsUserExit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveCsUserExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveCsUserExit;

        /**
         * Decodes a ZtLiveCsUserExit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveCsUserExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveCsUserExit;

        /**
         * Verifies a ZtLiveCsUserExit message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveCsUserExit message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveCsUserExit
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveCsUserExit;

        /**
         * Creates a plain object from a ZtLiveCsUserExit message. Also converts values to other types if specified.
         * @param message ZtLiveCsUserExit
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveCsUserExit, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveCsUserExit to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveCsUserExit
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveCsUserExitAck. */
    interface IZtLiveCsUserExitAck {
    }

    /** Represents a ZtLiveCsUserExitAck. */
    class ZtLiveCsUserExitAck implements IZtLiveCsUserExitAck {

        /**
         * Constructs a new ZtLiveCsUserExitAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveCsUserExitAck);

        /**
         * Creates a new ZtLiveCsUserExitAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveCsUserExitAck instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveCsUserExitAck): AcFunDanmu.ZtLiveCsUserExitAck;

        /**
         * Encodes the specified ZtLiveCsUserExitAck message. Does not implicitly {@link AcFunDanmu.ZtLiveCsUserExitAck.verify|verify} messages.
         * @param message ZtLiveCsUserExitAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveCsUserExitAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveCsUserExitAck message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveCsUserExitAck.verify|verify} messages.
         * @param message ZtLiveCsUserExitAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveCsUserExitAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveCsUserExitAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveCsUserExitAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveCsUserExitAck;

        /**
         * Decodes a ZtLiveCsUserExitAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveCsUserExitAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveCsUserExitAck;

        /**
         * Verifies a ZtLiveCsUserExitAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveCsUserExitAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveCsUserExitAck
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveCsUserExitAck;

        /**
         * Creates a plain object from a ZtLiveCsUserExitAck message. Also converts values to other types if specified.
         * @param message ZtLiveCsUserExitAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveCsUserExitAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveCsUserExitAck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveCsUserExitAck
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** ZtLiveDownstreamPayloadErrorCode enum. */
    enum ZtLiveDownstreamPayloadErrorCode {
        SUCCESS_DOWNSTREAM_PAYLOAD = 0,
        CS_CMD_PARSE_ERROR = 100001,
        CS_CMD_CMD_NOT_SUPPORT = 100002,
        CS_CMD_TICKET_ILLEGAL = 100003
    }

    /** Properties of a ZtLiveNotifySignalItem. */
    interface IZtLiveNotifySignalItem {

        /** ZtLiveNotifySignalItem signalType */
        signalType?: (string|null);

        /** ZtLiveNotifySignalItem payload */
        payload?: (Uint8Array|null);
    }

    /** Represents a ZtLiveNotifySignalItem. */
    class ZtLiveNotifySignalItem implements IZtLiveNotifySignalItem {

        /**
         * Constructs a new ZtLiveNotifySignalItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveNotifySignalItem);

        /** ZtLiveNotifySignalItem signalType. */
        public signalType: string;

        /** ZtLiveNotifySignalItem payload. */
        public payload: Uint8Array;

        /**
         * Creates a new ZtLiveNotifySignalItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveNotifySignalItem instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveNotifySignalItem): AcFunDanmu.ZtLiveNotifySignalItem;

        /**
         * Encodes the specified ZtLiveNotifySignalItem message. Does not implicitly {@link AcFunDanmu.ZtLiveNotifySignalItem.verify|verify} messages.
         * @param message ZtLiveNotifySignalItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveNotifySignalItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveNotifySignalItem message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveNotifySignalItem.verify|verify} messages.
         * @param message ZtLiveNotifySignalItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveNotifySignalItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveNotifySignalItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveNotifySignalItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveNotifySignalItem;

        /**
         * Decodes a ZtLiveNotifySignalItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveNotifySignalItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveNotifySignalItem;

        /**
         * Verifies a ZtLiveNotifySignalItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveNotifySignalItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveNotifySignalItem
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveNotifySignalItem;

        /**
         * Creates a plain object from a ZtLiveNotifySignalItem message. Also converts values to other types if specified.
         * @param message ZtLiveNotifySignalItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveNotifySignalItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveNotifySignalItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveNotifySignalItem
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveScActionSignal. */
    interface IZtLiveScActionSignal {

        /** ZtLiveScActionSignal item */
        item?: (AcFunDanmu.IZtLiveActionSignalItem[]|null);
    }

    /** Represents a ZtLiveScActionSignal. */
    class ZtLiveScActionSignal implements IZtLiveScActionSignal {

        /**
         * Constructs a new ZtLiveScActionSignal.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveScActionSignal);

        /** ZtLiveScActionSignal item. */
        public item: AcFunDanmu.IZtLiveActionSignalItem[];

        /**
         * Creates a new ZtLiveScActionSignal instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveScActionSignal instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveScActionSignal): AcFunDanmu.ZtLiveScActionSignal;

        /**
         * Encodes the specified ZtLiveScActionSignal message. Does not implicitly {@link AcFunDanmu.ZtLiveScActionSignal.verify|verify} messages.
         * @param message ZtLiveScActionSignal message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveScActionSignal, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveScActionSignal message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveScActionSignal.verify|verify} messages.
         * @param message ZtLiveScActionSignal message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveScActionSignal, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveScActionSignal message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveScActionSignal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveScActionSignal;

        /**
         * Decodes a ZtLiveScActionSignal message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveScActionSignal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveScActionSignal;

        /**
         * Verifies a ZtLiveScActionSignal message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveScActionSignal message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveScActionSignal
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveScActionSignal;

        /**
         * Creates a plain object from a ZtLiveScActionSignal message. Also converts values to other types if specified.
         * @param message ZtLiveScActionSignal
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveScActionSignal, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveScActionSignal to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveScActionSignal
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveScMessage. */
    interface IZtLiveScMessage {

        /** ZtLiveScMessage messageType */
        messageType?: (string|null);

        /** ZtLiveScMessage compressionType */
        compressionType?: (AcFunDanmu.ZtLiveScMessage.CompressionType|null);

        /** ZtLiveScMessage payload */
        payload?: (Uint8Array|null);

        /** ZtLiveScMessage liveId */
        liveId?: (string|null);

        /** ZtLiveScMessage ticket */
        ticket?: (string|null);

        /** ZtLiveScMessage serverTimestampMs */
        serverTimestampMs?: (number|Long|null);
    }

    /** Represents a ZtLiveScMessage. */
    class ZtLiveScMessage implements IZtLiveScMessage {

        /**
         * Constructs a new ZtLiveScMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveScMessage);

        /** ZtLiveScMessage messageType. */
        public messageType: string;

        /** ZtLiveScMessage compressionType. */
        public compressionType: AcFunDanmu.ZtLiveScMessage.CompressionType;

        /** ZtLiveScMessage payload. */
        public payload: Uint8Array;

        /** ZtLiveScMessage liveId. */
        public liveId: string;

        /** ZtLiveScMessage ticket. */
        public ticket: string;

        /** ZtLiveScMessage serverTimestampMs. */
        public serverTimestampMs: (number|Long);

        /**
         * Creates a new ZtLiveScMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveScMessage instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveScMessage): AcFunDanmu.ZtLiveScMessage;

        /**
         * Encodes the specified ZtLiveScMessage message. Does not implicitly {@link AcFunDanmu.ZtLiveScMessage.verify|verify} messages.
         * @param message ZtLiveScMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveScMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveScMessage message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveScMessage.verify|verify} messages.
         * @param message ZtLiveScMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveScMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveScMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveScMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveScMessage;

        /**
         * Decodes a ZtLiveScMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveScMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveScMessage;

        /**
         * Verifies a ZtLiveScMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveScMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveScMessage
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveScMessage;

        /**
         * Creates a plain object from a ZtLiveScMessage message. Also converts values to other types if specified.
         * @param message ZtLiveScMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveScMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveScMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveScMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace ZtLiveScMessage {

        /** CompressionType enum. */
        enum CompressionType {
            UNKNOWN = 0,
            NONE = 1,
            GZIP = 2
        }
    }

    /** Properties of a ZtLiveScNotifySignal. */
    interface IZtLiveScNotifySignal {

        /** ZtLiveScNotifySignal item */
        item?: (AcFunDanmu.IZtLiveNotifySignalItem[]|null);
    }

    /** Represents a ZtLiveScNotifySignal. */
    class ZtLiveScNotifySignal implements IZtLiveScNotifySignal {

        /**
         * Constructs a new ZtLiveScNotifySignal.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveScNotifySignal);

        /** ZtLiveScNotifySignal item. */
        public item: AcFunDanmu.IZtLiveNotifySignalItem[];

        /**
         * Creates a new ZtLiveScNotifySignal instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveScNotifySignal instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveScNotifySignal): AcFunDanmu.ZtLiveScNotifySignal;

        /**
         * Encodes the specified ZtLiveScNotifySignal message. Does not implicitly {@link AcFunDanmu.ZtLiveScNotifySignal.verify|verify} messages.
         * @param message ZtLiveScNotifySignal message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveScNotifySignal, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveScNotifySignal message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveScNotifySignal.verify|verify} messages.
         * @param message ZtLiveScNotifySignal message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveScNotifySignal, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveScNotifySignal message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveScNotifySignal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveScNotifySignal;

        /**
         * Decodes a ZtLiveScNotifySignal message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveScNotifySignal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveScNotifySignal;

        /**
         * Verifies a ZtLiveScNotifySignal message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveScNotifySignal message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveScNotifySignal
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveScNotifySignal;

        /**
         * Creates a plain object from a ZtLiveScNotifySignal message. Also converts values to other types if specified.
         * @param message ZtLiveScNotifySignal
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveScNotifySignal, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveScNotifySignal to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveScNotifySignal
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveScStateSignal. */
    interface IZtLiveScStateSignal {

        /** ZtLiveScStateSignal item */
        item?: (AcFunDanmu.IZtLiveStateSignalItem[]|null);
    }

    /** Represents a ZtLiveScStateSignal. */
    class ZtLiveScStateSignal implements IZtLiveScStateSignal {

        /**
         * Constructs a new ZtLiveScStateSignal.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveScStateSignal);

        /** ZtLiveScStateSignal item. */
        public item: AcFunDanmu.IZtLiveStateSignalItem[];

        /**
         * Creates a new ZtLiveScStateSignal instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveScStateSignal instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveScStateSignal): AcFunDanmu.ZtLiveScStateSignal;

        /**
         * Encodes the specified ZtLiveScStateSignal message. Does not implicitly {@link AcFunDanmu.ZtLiveScStateSignal.verify|verify} messages.
         * @param message ZtLiveScStateSignal message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveScStateSignal, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveScStateSignal message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveScStateSignal.verify|verify} messages.
         * @param message ZtLiveScStateSignal message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveScStateSignal, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveScStateSignal message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveScStateSignal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveScStateSignal;

        /**
         * Decodes a ZtLiveScStateSignal message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveScStateSignal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveScStateSignal;

        /**
         * Verifies a ZtLiveScStateSignal message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveScStateSignal message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveScStateSignal
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveScStateSignal;

        /**
         * Creates a plain object from a ZtLiveScStateSignal message. Also converts values to other types if specified.
         * @param message ZtLiveScStateSignal
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveScStateSignal, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveScStateSignal to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveScStateSignal
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveStateSignalItem. */
    interface IZtLiveStateSignalItem {

        /** ZtLiveStateSignalItem signalType */
        signalType?: (string|null);

        /** ZtLiveStateSignalItem payload */
        payload?: (Uint8Array|null);
    }

    /** Represents a ZtLiveStateSignalItem. */
    class ZtLiveStateSignalItem implements IZtLiveStateSignalItem {

        /**
         * Constructs a new ZtLiveStateSignalItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveStateSignalItem);

        /** ZtLiveStateSignalItem signalType. */
        public signalType: string;

        /** ZtLiveStateSignalItem payload. */
        public payload: Uint8Array;

        /**
         * Creates a new ZtLiveStateSignalItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveStateSignalItem instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveStateSignalItem): AcFunDanmu.ZtLiveStateSignalItem;

        /**
         * Encodes the specified ZtLiveStateSignalItem message. Does not implicitly {@link AcFunDanmu.ZtLiveStateSignalItem.verify|verify} messages.
         * @param message ZtLiveStateSignalItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveStateSignalItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveStateSignalItem message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveStateSignalItem.verify|verify} messages.
         * @param message ZtLiveStateSignalItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveStateSignalItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveStateSignalItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveStateSignalItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveStateSignalItem;

        /**
         * Decodes a ZtLiveStateSignalItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveStateSignalItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveStateSignalItem;

        /**
         * Verifies a ZtLiveStateSignalItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveStateSignalItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveStateSignalItem
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveStateSignalItem;

        /**
         * Creates a plain object from a ZtLiveStateSignalItem message. Also converts values to other types if specified.
         * @param message ZtLiveStateSignalItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveStateSignalItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveStateSignalItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveStateSignalItem
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ZtLiveScStatusChanged. */
    interface IZtLiveScStatusChanged {

        /** ZtLiveScStatusChanged type */
        type?: (AcFunDanmu.ZtLiveScStatusChanged.Type|null);

        /** ZtLiveScStatusChanged maxRandomDelayMs */
        maxRandomDelayMs?: (number|Long|null);

        /** ZtLiveScStatusChanged bannedInfo */
        bannedInfo?: (AcFunDanmu.ZtLiveScStatusChanged.IBannedInfo|null);
    }

    /** Represents a ZtLiveScStatusChanged. */
    class ZtLiveScStatusChanged implements IZtLiveScStatusChanged {

        /**
         * Constructs a new ZtLiveScStatusChanged.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveScStatusChanged);

        /** ZtLiveScStatusChanged type. */
        public type: AcFunDanmu.ZtLiveScStatusChanged.Type;

        /** ZtLiveScStatusChanged maxRandomDelayMs. */
        public maxRandomDelayMs: (number|Long);

        /** ZtLiveScStatusChanged bannedInfo. */
        public bannedInfo?: (AcFunDanmu.ZtLiveScStatusChanged.IBannedInfo|null);

        /**
         * Creates a new ZtLiveScStatusChanged instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveScStatusChanged instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveScStatusChanged): AcFunDanmu.ZtLiveScStatusChanged;

        /**
         * Encodes the specified ZtLiveScStatusChanged message. Does not implicitly {@link AcFunDanmu.ZtLiveScStatusChanged.verify|verify} messages.
         * @param message ZtLiveScStatusChanged message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveScStatusChanged, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveScStatusChanged message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveScStatusChanged.verify|verify} messages.
         * @param message ZtLiveScStatusChanged message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveScStatusChanged, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveScStatusChanged message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveScStatusChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveScStatusChanged;

        /**
         * Decodes a ZtLiveScStatusChanged message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveScStatusChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveScStatusChanged;

        /**
         * Verifies a ZtLiveScStatusChanged message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveScStatusChanged message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveScStatusChanged
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveScStatusChanged;

        /**
         * Creates a plain object from a ZtLiveScStatusChanged message. Also converts values to other types if specified.
         * @param message ZtLiveScStatusChanged
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveScStatusChanged, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveScStatusChanged to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveScStatusChanged
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace ZtLiveScStatusChanged {

        /** Type enum. */
        enum Type {
            UNKNOWN = 0,
            LIVE_CLOSED = 1,
            NEW_LIVE_OPENED = 2,
            LIVE_URL_CHANGED = 3,
            LIVE_BANNED = 4
        }

        /** Properties of a BannedInfo. */
        interface IBannedInfo {

            /** BannedInfo banReason */
            banReason?: (string|null);

            /** BannedInfo b */
            b?: (string|null);
        }

        /** Represents a BannedInfo. */
        class BannedInfo implements IBannedInfo {

            /**
             * Constructs a new BannedInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: AcFunDanmu.ZtLiveScStatusChanged.IBannedInfo);

            /** BannedInfo banReason. */
            public banReason: string;

            /** BannedInfo b. */
            public b: string;

            /**
             * Creates a new BannedInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BannedInfo instance
             */
            public static create(properties?: AcFunDanmu.ZtLiveScStatusChanged.IBannedInfo): AcFunDanmu.ZtLiveScStatusChanged.BannedInfo;

            /**
             * Encodes the specified BannedInfo message. Does not implicitly {@link AcFunDanmu.ZtLiveScStatusChanged.BannedInfo.verify|verify} messages.
             * @param message BannedInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AcFunDanmu.ZtLiveScStatusChanged.IBannedInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BannedInfo message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveScStatusChanged.BannedInfo.verify|verify} messages.
             * @param message BannedInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AcFunDanmu.ZtLiveScStatusChanged.IBannedInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BannedInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BannedInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveScStatusChanged.BannedInfo;

            /**
             * Decodes a BannedInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BannedInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveScStatusChanged.BannedInfo;

            /**
             * Verifies a BannedInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BannedInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BannedInfo
             */
            public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveScStatusChanged.BannedInfo;

            /**
             * Creates a plain object from a BannedInfo message. Also converts values to other types if specified.
             * @param message BannedInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AcFunDanmu.ZtLiveScStatusChanged.BannedInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BannedInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BannedInfo
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a ZtLiveScTicketInvalid. */
    interface IZtLiveScTicketInvalid {
    }

    /** Represents a ZtLiveScTicketInvalid. */
    class ZtLiveScTicketInvalid implements IZtLiveScTicketInvalid {

        /**
         * Constructs a new ZtLiveScTicketInvalid.
         * @param [properties] Properties to set
         */
        constructor(properties?: AcFunDanmu.IZtLiveScTicketInvalid);

        /**
         * Creates a new ZtLiveScTicketInvalid instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZtLiveScTicketInvalid instance
         */
        public static create(properties?: AcFunDanmu.IZtLiveScTicketInvalid): AcFunDanmu.ZtLiveScTicketInvalid;

        /**
         * Encodes the specified ZtLiveScTicketInvalid message. Does not implicitly {@link AcFunDanmu.ZtLiveScTicketInvalid.verify|verify} messages.
         * @param message ZtLiveScTicketInvalid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AcFunDanmu.IZtLiveScTicketInvalid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZtLiveScTicketInvalid message, length delimited. Does not implicitly {@link AcFunDanmu.ZtLiveScTicketInvalid.verify|verify} messages.
         * @param message ZtLiveScTicketInvalid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AcFunDanmu.IZtLiveScTicketInvalid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZtLiveScTicketInvalid message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZtLiveScTicketInvalid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcFunDanmu.ZtLiveScTicketInvalid;

        /**
         * Decodes a ZtLiveScTicketInvalid message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZtLiveScTicketInvalid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcFunDanmu.ZtLiveScTicketInvalid;

        /**
         * Verifies a ZtLiveScTicketInvalid message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZtLiveScTicketInvalid message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZtLiveScTicketInvalid
         */
        public static fromObject(object: { [k: string]: any }): AcFunDanmu.ZtLiveScTicketInvalid;

        /**
         * Creates a plain object from a ZtLiveScTicketInvalid message. Also converts values to other types if specified.
         * @param message ZtLiveScTicketInvalid
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AcFunDanmu.ZtLiveScTicketInvalid, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZtLiveScTicketInvalid to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ZtLiveScTicketInvalid
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** ZtLiveStartPlaySourceTypeProto enum. */
    enum ZtLiveStartPlaySourceTypeProto {
        ZtLiveStartPlaySourceTypeProtoA = 0,
        ZtLiveStartPlaySourceTypeProtoB = 1
    }
}
