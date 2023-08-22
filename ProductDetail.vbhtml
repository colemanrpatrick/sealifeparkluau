@imports paymentmanagermodels

@ModelType productdetailsviewmodel

@*@Code
    Model.Title = Model.Product.Title
    If Model.Product.Metas.Where(Function(m) m.PropertyName = "MetaDescription").Count > 0 Then
        Model.MetaDescription = Model.Product.Metas.Where(Function(m) m.PropertyName = "MetaDescription").First.Content
    End If
    If Model.Product.Metas.Where(Function(m) m.PropertyName = "MetaKeywords").Count > 0 Then
        Model.MetaKeywords = Model.Product.Metas.Where(Function(m) m.PropertyName = "MetaKeywords").First.Content
    End If
    If Model.Product.Metas.Where(Function(m) m.PropertyName = "Canonical").Count > 0 Then
        Model.Canonical = Model.Product.Metas.Where(Function(m) m.PropertyName = "Canonical").First.Content
    End If
    If Model.Product.Metas.Where(Function(m) m.PropertyName = "MetaAuthor").Count > 0 Then
        Model.MetaAuthor = Model.Product.Metas.Where(Function(m) m.PropertyName = "MetaAuthor").First.Content
    End If
End Code*@

@Layout Layout.vbhtml

<link rel="stylesheet" href="~/designs/sealifeparkluau/css/purchase.css">
<div class="container" id="container-header">
    <!-- class="header-right" class="header-left" class="header-center" -->
    <header class="header-center">
        <h2>luau packages</h2>
        <h3>Book with us for the <b>best pricing</b> on reservations</h3>
    </header>
    <img src="~/designs/sealifeparkluau/images/photos/leis.jpeg" alt="">
</div>
@Code
    Dim oGoldAdult As Price = Model.Product.Prices.Where(Function(p) p.Groupings.Any(Function(g) g.Name = "Gold Package") And p.Active = True And p.Category.Shortcode = "Adult").First
    Dim oGoldYouth As Price = Model.Product.Prices.Where(Function(p) p.Groupings.Any(Function(g) g.Name = "Gold Package") And p.Active = True And p.Category.Shortcode = "Youth").First
    Dim oGoldChild As Price = Model.Product.Prices.Where(Function(p) p.Groupings.Any(Function(g) g.Name = "Gold Package") And p.Active = True And p.Category.Shortcode = "Child").First
    Dim oSilverAdult As Price = Model.Product.Prices.Where(Function(p) p.Groupings.Any(Function(g) g.Name = "Silver Package") And p.Active = True And p.Category.Shortcode = "Adult").First
    Dim oSilverYouth As Price = Model.Product.Prices.Where(Function(p) p.Groupings.Any(Function(g) g.Name = "Silver Package") And p.Active = True And p.Category.Shortcode = "Youth").First
    Dim oSilverChild As Price = Model.Product.Prices.Where(Function(p) p.Groupings.Any(Function(g) g.Name = "Silver Package") And p.Active = True And p.Category.Shortcode = "Child").First
    Dim oBronzeAdult As Price = Model.Product.Prices.Where(Function(p) p.Groupings.Any(Function(g) g.Name = "Bronze Package") And p.Active = True And p.Category.Shortcode = "Adult").First
    Dim oBronzeYouth As Price = Model.Product.Prices.Where(Function(p) p.Groupings.Any(Function(g) g.Name = "Bronze Package") And p.Active = True And p.Category.Shortcode = "Youth").First
    Dim oBronzeChild As Price = Model.Product.Prices.Where(Function(p) p.Groupings.Any(Function(g) g.Name = "Bronze Package") And p.Active = True And p.Category.Shortcode = "Child").First
    Dim oLapChild As Price = Model.Product.Prices.Where(Function(p) p.Groupings.Count = 0 And p.Active = True And p.Category.Shortcode = "Infant").First
    Dim oTransportation As Price = Model.Product.Prices.Where(Function(p) p.Description.Contains("Transportation") And p.Active = True).First
    Dim oProductOrder As New ProductOrder
    If Model.ProductOrder IsNot Nothing Then oProductOrder = Model.ProductOrder


    Dim oActivityDate As New CartEntityAttributeEditViewModel With {.UniqueKey = Model.ProductOrderKey, .EntityAttribute = Model.Product.Collectors.Single(Function(t) t.Type.Shortcode = "Activity Date")}
    If oProductOrder.Collectors.Where(Function(t) t.Type.Shortcode = "Activity Date").Count > 0 Then
        oActivityDate.EntityAttribute = oProductOrder.Collectors.First(Function(t) t.Type.Shortcode = "Activity Date")
    End If

    Dim oParticipants As New CartEntityAttributeEditViewModel With {.UniqueKey = Model.ProductOrderKey, .EntityAttribute = Model.Product.Collectors.Single(Function(t) t.Type.Shortcode = "Participant Names and Ages")}
    If oProductOrder.Collectors.Where(Function(t) t.Type.Shortcode = "Participant Names and Ages").Count > 0 Then
        oParticipants.EntityAttribute = oProductOrder.Collectors.First(Function(t) t.Type.Shortcode = "Participant Names and Ages")
    End If

    Dim oEarlyPickup As New CartEntityAttributeEditViewModel With {.UniqueKey = Model.ProductOrderKey, .EntityAttribute = Model.Product.Collectors.Single(Function(t) t.Type.Shortcode = "Early Pickup")}
    If oProductOrder.Collectors.Where(Function(t) t.Type.Shortcode = "Early Pickup").Count > 0 Then
        oEarlyPickup.EntityAttribute = oProductOrder.Collectors.First(Function(t) t.Type.Shortcode = "Early Pickup")
    Else
        oEarlyPickup.EntityAttribute.Value = "false"
    End If
    Dim sEarlyPickup As String = "false"
    Select Case oEarlyPickup.EntityAttribute.Value
        Case "off", "false", "0"
            sEarlyPickup = "false"
        Case Else
            sEarlyPickup = "true"
    End Select

    Dim sGoldAdultDisplayQuantity As String = "0"
    If oProductOrder.PriceOrders.Where(Function(po) po.Price.ID = oGoldAdult.ID).Count > 0 Then
        sGoldAdultDisplayQuantity = oProductOrder.PriceOrders.Single(Function(po) po.Price.ID = oGoldAdult.ID).Quantity
    End If
    Dim sGoldYouthDisplayQuantity As String = "0"
    If oProductOrder.PriceOrders.Where(Function(po) po.Price.ID = oGoldYouth.ID).Count > 0 Then
        sGoldYouthDisplayQuantity = oProductOrder.PriceOrders.Single(Function(po) po.Price.ID = oGoldYouth.ID).Quantity
    End If
    Dim sGoldChildDisplayQuantity As String = "0"
    If oProductOrder.PriceOrders.Where(Function(po) po.Price.ID = oGoldChild.ID).Count > 0 Then
        sGoldChildDisplayQuantity = oProductOrder.PriceOrders.Single(Function(po) po.Price.ID = oGoldChild.ID).Quantity
    End If

    Dim sSilverAdultDisplayQuantity As String = "0"
    If oProductOrder.PriceOrders.Where(Function(po) po.Price.ID = oSilverAdult.ID).Count > 0 Then
        sSilverAdultDisplayQuantity = oProductOrder.PriceOrders.Single(Function(po) po.Price.ID = oSilverAdult.ID).Quantity
    End If
    Dim sSilverYouthDisplayQuantity As String = "0"
    If oProductOrder.PriceOrders.Where(Function(po) po.Price.ID = oSilverYouth.ID).Count > 0 Then
        sSilverYouthDisplayQuantity = oProductOrder.PriceOrders.Single(Function(po) po.Price.ID = oSilverYouth.ID).Quantity
    End If
    Dim sSilverChildDisplayQuantity As String = "0"
    If oProductOrder.PriceOrders.Where(Function(po) po.Price.ID = oSilverChild.ID).Count > 0 Then
        sSilverChildDisplayQuantity = oProductOrder.PriceOrders.Single(Function(po) po.Price.ID = oSilverChild.ID).Quantity
    End If

    Dim sBronzeAdultDisplayQuantity As String = "0"
    If oProductOrder.PriceOrders.Where(Function(po) po.Price.ID = oBronzeAdult.ID).Count > 0 Then
        sBronzeAdultDisplayQuantity = oProductOrder.PriceOrders.Single(Function(po) po.Price.ID = oBronzeAdult.ID).Quantity
    End If
    Dim sBronzeYouthDisplayQuantity As String = "0"
    If oProductOrder.PriceOrders.Where(Function(po) po.Price.ID = oBronzeYouth.ID).Count > 0 Then
        sBronzeYouthDisplayQuantity = oProductOrder.PriceOrders.Single(Function(po) po.Price.ID = oBronzeYouth.ID).Quantity
    End If
    Dim sBronzeChildDisplayQuantity As String = "0"
    If oProductOrder.PriceOrders.Where(Function(po) po.Price.ID = oBronzeChild.ID).Count > 0 Then
        sBronzeChildDisplayQuantity = oProductOrder.PriceOrders.Single(Function(po) po.Price.ID = oBronzeChild.ID).Quantity
    End If

    Dim sLapChildDisplayQuantity As String = "0"
    If oProductOrder.PriceOrders.Where(Function(po) po.Price.ID = oLapChild.ID).Count > 0 Then
        sLapChildDisplayQuantity = oProductOrder.PriceOrders.Single(Function(po) po.Price.ID = oLapChild.ID).Quantity
    End If

    Dim sTransportationDisplayQuantity As String = "0"
    If oProductOrder.PriceOrders.Where(Function(po) po.Price.ID = oTransportation.ID).Count > 0 Then
        sTransportationDisplayQuantity = oProductOrder.PriceOrders.Single(Function(po) po.Price.ID = oTransportation.ID).Quantity
    End If
End Code

<script>
    @try
        if model.order isnot nothing andalso model.order.customer isnot nothing Then
            @:const emailName = '@model.Order.Customer.PrimaryEmail';
            @:const emailPhone = '@model.Order.Customer.MobilePhone';
        else
            @:const emailName = '';
            @:const emailPhone = '';
        End if

    catch ex as exception
        'console.log("email or phone variable names not defined correctly",error);
    end try
</script>

@Code
    Dim s As String = Newtonsoft.Json.JsonConvert.SerializeObject(model.CartConfiguation)
End Code
<script>
    let cartConfig = @html.raw(s) ;
</script>

<!-- ================================= -->
<!-- ||||||||||||||||||||||||||||||||| -->
<!-- ================================= -->
<div class="container" id="container-third">
    <div class="packages-container">
        <!-- ================================= -->
        <div class="package">
            <section>
                <img src="~/designs/sealifeparkluau/images/design/goldlogo.png" alt="">
                <h3>Gold Package</h3>
                <ul>
                    @for Each oPrice As Price In Model.Product.Prices.Where(Function(p) p.Groupings.Any(Function(g) g.Name = "Gold Package") And p.Active = True).OrderBy(Function(o) o.DisplayOrder).ToList
                        @<li><p>@oPrice.Description<br /><b>@oPrice.ListPrice</b></p></li>
                    Next
                </ul>
            </section>
            <section>
                <article>
                    <p>• Buffet Dinner</p>
                    <p>• Cultural Activities</p>
                    <p>• Flower Lei Greeting</p>
                    <p>• Gold Seating</p>
                    <p>• 2 Drink Tickets</p>
                    <p>• Complimentary Welcome Mai Tai</p>
                    <p>• Souvenir Photo (1 per group)</p>
                    <p>• Park Admission - 10 Day Pass</p>
                    <p>• 20% off retail</p>
                    <p>• 20% off Tiki treats</p>
                </article>
                <a href="~/designs/sealifeparkluau/images/design/seating-chart.png" target="_blank"><span>seating chart</span></a>
                <button type="button" class="yellow-button" onclick="openCheckout()">
                    <span>book now</span>
                    <span class="material-symbols-outlined">calendar_month</span>
                </button>
            </section>
        </div>
        <!-- ================================= -->
        <div class="package">
            <section>
                <img src="~/designs/sealifeparkluau/images/design/silverlogo.png" alt="">
                <h3>Silver Package</h3>
                <ul>
                    @for Each oPrice As Price In Model.Product.Prices.Where(Function(p) p.Groupings.Any(Function(g) g.Name = "Silver Package") And p.Active = True).OrderBy(Function(o) o.DisplayOrder).ToList
                        @<li><p>@oPrice.Description<br /><b>@iif(oPrice.SalePrice>0, oPrice.SalePrice, oPrice.Listprice)</b></p></li>
                    Next
                </ul>
            </section>
            <section>
                <article>
                    <p>• Buffet Dinner</p>
                    <p>• Cultural Activities</p>
                    <p>• Flower Lei Greeting</p>
                    <p>• Silver Seating</p>
                    <p>• 2 Drink Tickets</p>
                    <p>• Park Admission - 5 Day Pass</p>
                    <p>• 20% off retail</p>
                    <p>• 20% off Tiki treats</p>
                </article>
                <a href="~/designs/sealifeparkluau/images/design/seating-chart.png" target="_blank"><span>seating chart</span></a>
                <button type="button" class="yellow-button" onclick="openCheckout()">
                    <span>book now</span>
                    <span class="material-symbols-outlined">calendar_month</span>
                </button>
            </section>
        </div>
        <!-- ================================= -->
        <div class="package">
            <section>
                <img src="~/designs/sealifeparkluau/images/design/bronzelogo.png" alt="">
                <h3>Bronze Package</h3>
                <ul>
                    @for Each oPrice As Price In Model.Product.Prices.Where(Function(p) p.Groupings.Any(Function(g) g.Name = "Bronze Package") And p.Active = True).OrderBy(Function(o) o.DisplayOrder).ToList
                        @<li><p>@oPrice.Description<br /><b>@iif(oPrice.SalePrice>0, oPrice.SalePrice, oPrice.Listprice)</b></p></li>
                    Next
                </ul>
            </section>
            <section>
                <article>
                    <p>• Buffet Dinner</p>
                    <p>• Cultural Activities</p>
                    <p>• Shell Lei Greeting</p>
                    <p>• Bronze Seating</p>
                    <p>• 1 Drink Tickets</p>
                </article>
                <a href="~/designs/sealifeparkluau/images/design/seating-chart.png" target="_blank"><span>seating chart</span></a>
                <button type="button" class="yellow-button" onclick="openCheckout()">
                    <span>book now</span>
                    <span class="material-symbols-outlined">calendar_month</span>
                </button>
            </section>
        </div>
        <!-- ================================= -->
    </div>
</div>


<!-- ================================= -->
<!-- ||||||||||||||||||||||||||||||||| -->
<!-- ||||||||||||||||||||||||||||||||| -->
<!-- ================================= -->

<!-- ================================= -->
<!-- ||||||||||||||||||||||||||||||||| -->
<!-- ================================= -->
<form action="/products/details/@Model.Product.ID" method="post" id="addToCartForm">
    <input type="hidden" name="cart" value="True" />
    <input type="hidden" name="updateProductOrder" value="Update" />
    <div id="checkout-window">
        <div id="checkout-content">
            <header>
                <h2 id="checkout-header"></h2>
                <button type="button" onclick="closeCheckout()"><span
                        class='material-symbols-outlined'>close</span></button>
            </header>
            <div id="checkout-group">
                <!-- ====================== -->
                <div class="addToCartPage" id="page-1">
                    <section></section>
                    <span id="date-error" class="date-error">Please select an available date</span>
                    <div class="checkout-footer">
                        <button class="next-btn" onclick="showPage2()" type="button">next</button>
                    </div>
                </div>
                <!-- ====================== -->
                <div class="addToCartPage" id="page-2">
                    <section></section>
                    <span id="price-error" class="price-error">Please select an option</span>
                    <div class="checkout-footer">
                        <button class="prev-btn" onclick="showPage1()" type="button">prev</button>
                        <button class="next-btn" onclick="showPage3()" type="button">next</button>
                    </div>
                </div>
                <!-- ====================== -->
                <div class="addToCartPage" id="page-3">
                    <section>

                        <!-- <div id="early-transportation"></div>
                        @Code
                            Dim oListMembers As List(Of Codetable) = Model.CollectorLists.Single(Function(cl) cl.Codetable.ID = 4).Children
                            Dim iListMemberID As Integer = Model.CollectorLists.Single(Function(cl) cl.Codetable.ID = 4).SelectedCodetableID
        
                        End Code
                        <select name="@(New String("SelectYourOahuHotel_" & Model.ProductOrderKey))" tabindex="-1" aria-hidden="true" required >
                            <option value="">Select Your Oahu Hotel</option>
        
                            @For Each ct As Codetable In oListMembers.OrderBy(Function(c) c.DisplayOrder).Where(Function(c) c.Active And Not c.Hidden).ToList
                                @<option value="@ct.ID"
                                            @Try 'the collector type from product.collectors should equal collectorlist.codetable for list type collectors
                                                If ct.ID = iListMemberID Then
                                                @: selected
                                                End If
                                            Catch ex As Exception
        
                                            End Try
        
                                            >
                                    @ct.Shortcode
                                </option>
                            Next
                        </select> -->

                    </section>
                    <div class="checkout-footer">
                        <button class="prev-btn" onclick="showPage2()" type="button">prev</button>
                        <input type="hidden" name="cart" value="True" />
                        <button type="submit" name="submit" value="Add to Cart" id="addToCartSubmit" disabled>add to cart</button>
                    </div>
                </div>
                <!-- ====================== -->
            </div>
        </div>
    </div>
</form>

<script>
    window.onload = function() {
        document.getElementById("addToCartForm").setAttribute("action","/products/details/" + cartConfig.ProductID + "");
    };
</script>

<!-- ================================= -->
<!-- ||||||||||||||||||||||||||||||||| -->
<!-- ================================= -->

<ul id="packages-lower">
    <li>
        <img src="~/designs/sealifeparkluau/images/design/seating-chart.png" alt="">
    </li>
    <li>
        <aside id="seating-aside">
            <h3>
                need transportation?<span class="material-symbols-outlined">
                    airport_shuttle
                </span>
            </h3>
            <p>We offer comfortable round-trip transportation from several convenient pick-up locations in Waikiki and surrounding areas for just <b>$25/person</b>.</p>
            <p>Select your transportation options during checkout. Additionally, self-parking is available at Sea Life ark for <b>$15/car</b>.</p>
            <p><span>ADA accessible vehicles are available with 48-hour advance notice. Please email at <a href="mailto:sales@hawaiidiscount.com">sales@hawaiidiscount.com</a> to request.</span></p>
        </aside>
    </li>
</ul>
<!-- ================================= -->
<!-- ||||||||||||||||||||||||||||||||| -->
<!-- ================================= -->
<script type="text/javascript" src="~/designs/sealifeparkluau/js/toggle.js"></script>
<!-- <script type="text/javascript" src="~/designs/sealifeparkluau/js/main.js"></script> -->
<script type="text/javascript" src="~/designs/sealifeparkluau/js/reservations.js"></script>