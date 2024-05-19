from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse


from .models import Flight
from .models import Passenger
# Create your views here.
def index(request):
    return render(request, "flights/index.html", {
        "flights": Flight.objects.all()
    })

def flight(request, flight_id):
    flight = Flight.object.get(pk=flight_id)
    return render(request, "flight/flight.html",{
        "flight":flight,
        "passenger": flight.passenger.all(),
        "non_passenger": Passenger.object.exclude(flights=flight).all()
    })

def book(request, flight_id):
    if request.method == "POST":
        flight = Flight.objects.get(pk=flight_id)
        passeneger = Passenger.object.get(pk = int(request.POST["passenger"]))
        passeneger.flights.add(flight)
        return HttpResponseRedirect(reverse("flight", args=((flight.id,))))