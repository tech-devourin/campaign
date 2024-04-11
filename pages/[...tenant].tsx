import React, { useEffect } from 'react'
import HeadMetaTags from '@module/headMetaTags';
import { windowRef } from 'app/service/window';
import { APISERVICE } from 'app/service/RestClient';

export const getTenantData = (tenant) => {
    return new Promise((res, rej) => {
        let tenantUrl = process.env.TENANT_DB_URL + '/tenant/' + tenant;
        APISERVICE.GET(tenantUrl)  //get tenant details
            .then(async (tenantResponse) => {
                if (tenantResponse.status == 200) {
                    const tenant = tenantResponse.data;
                    if (tenant && !tenant[0].terminate) {
                        res(tenant[0]);
                    } else {
                        rej({ err: 'Inactive tenant' });
                    }
                } else {
                    rej({ err: 'Inactive tenant' });
                }
            }).catch(function (error) {
                rej(error);
                console.log("error", error);
            });
    })
};
export const getPromotionData = (tenant, promotionId) => {
    return new Promise((res, rej) => {
        getTenantData(tenant).then((tenantData: any) => {
            let promotionUrl = '';
            if (promotionId) {
                promotionUrl = process.env.TENANT_DB_URL + '/promotion/' + promotionId;
                APISERVICE.GET(promotionUrl)  //get tenant details
                    .then(async (storeResponse) => {
                        if (storeResponse.status == 200 && storeResponse.data) {
                            const promoData = storeResponse.data;
                            promoData.domain = tenantData.domain;
                            promoData.params = tenantData.params;
                            res(promoData);
                        } else {
                            rej({ err: 'Inactive Store' });
                        }
                    }).catch(function (error) {
                        rej(error);
                        console.log("error", error);
                    });
            } else {
                res(tenantData)
            }
        }).catch(function (error) {
            rej(error);
            console.log("error", error);
        });
    })
};
export async function getServerSideProps(context) {
    debugger
    console.log(context.query);
    let currentContext = context.params.tenant;
    let metaTags: any = null;
    let promotionData = null;
    const [tenant, promotionId] = currentContext
    if (context && context?.params && tenant && tenant != '404') {
        await getPromotionData(tenant, promotionId).then(async (response: any) => {
            if (response) {
                promotionData = response;
                metaTags = {
                    title: promotionData?.ptitle || '',
                    description: promotionData?.pdescp || '',
                    image: promotionData?.pimgurl || '',
                    siteName: promotionData?.domain || '',
                }
            }
        }).catch((err) => {
            console.log(err)
            return {
                notFound: true
            }
        });
        if (promotionData) {
            return {
                props: { promotionData, metaTags },
            };
        } else {
            return {
                notFound: true
            }
        }
    } else {
        return {
            notFound: true
        }
    }
}

export default function Tenant({ metaTags, promotionData }) {
    useEffect(() => {
        if (windowRef) {
            let redirectUrl = 'http://' + promotionData.domain + (promotionData.params ? promotionData.params : '');
            if (!(redirectUrl.includes('br=')) && promotionData.branchId) {
                redirectUrl = redirectUrl + `?br=${promotionData.branchId}`
            }
            window.location.href = redirectUrl;
            console.log('window avl', metaTags, promotionData, redirectUrl);
        }
    }, [windowRef])
    return (
        <div>
            <HeadMetaTags {...metaTags} />
            {/* <button onClick={redirect}>Redirect</button> */}
        </div>
    )
}
